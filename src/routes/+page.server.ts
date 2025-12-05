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

  // Configure marked with syntax highlighting
  const renderer = new marked.Renderer();

  renderer.heading = ({ text, depth }) => {
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    return `<h${depth} id="${id}">${text}</h${depth}>`;
  };

  renderer.code = async ({ text, lang }) => {
    if (lang && lang !== 'text') {
      try {
        const highlighted = await codeToHtml(text, {
          lang,
          theme: 'github-light'
        });
        return highlighted;
      } catch (e) {
        // Fallback to plain code block if language not supported
        return `<pre><code class="language-${lang}">${text}</code></pre>`;
      }
    }
    return `<pre><code>${text}</code></pre>`;
  };

  marked.setOptions({ renderer });

  // Render markdown with syntax highlighting
  const html = await marked(markdown);

  return { html, toc };
}
