import { readFileSync } from 'fs';
import { resolve } from 'path';
import { marked } from 'marked';
import { codeToHtml } from 'shiki';

export async function load() {
  // Read the generated markdown
  const markdownPath = resolve(process.cwd(), 'src/lib/reference.generated.md');
  const markdown = readFileSync(markdownPath, 'utf-8');

  // Extract TOC from ## headings
  const toc: Array<{ id: string; title: string; level: number }> = [];
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const title = match[2];
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    toc.push({ id, title, level });
  }

  // Parse markdown tokens
  const tokens = marked.lexer(markdown);

  // Pre-process code blocks with syntax highlighting
  const processTokens = async (tokens: any[]): Promise<void> => {
    for (const token of tokens) {
      if (token.type === 'code' && token.lang) {
        try {
          token.highlighted = await codeToHtml(token.text, {
            lang: token.lang,
            themes: {
              light: 'github-light',
              dark: 'github-dark'
            },
            defaultColor: false
          });
        } catch (e) {
          // Keep original if highlighting fails
          token.highlighted = null;
        }
      }
      // Recursively process nested tokens
      if (token.tokens) {
        await processTokens(token.tokens);
      }
    }
  };

  await processTokens(tokens);

  // Configure renderer to use pre-highlighted code
  const renderer = new marked.Renderer();

  renderer.heading = ({ text, depth }) => {
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    return `<h${depth} id="${id}">${text}</h${depth}>`;
  };

  renderer.code = ({ text, lang, escaped }: any) => {
    // Use pre-highlighted version if available
    const token = tokens.find((t: any) => t.type === 'code' && t.text === text) as { highlighted?: string } | undefined;
    if (token?.highlighted) {
      return token.highlighted;
    }
    // Fallback
    if (lang) {
      return `<pre><code class="language-${lang}">${escaped ? text : escape(text)}</code></pre>`;
    }
    return `<pre><code>${escaped ? text : escape(text)}</code></pre>`;
  };

  marked.setOptions({ renderer });

  // Render with pre-processed tokens
  const html = marked.parser(tokens);

  return { html, toc };
}

function escape(html: string): string {
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
