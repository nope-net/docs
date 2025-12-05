import { readFileSync } from 'fs';
import { resolve } from 'path';

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

  return { markdown, toc };
}
