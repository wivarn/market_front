import gfm from "remark-gfm";
import matter from "gray-matter";
import parse from "remark-parse";
import remarkHtml from "remark-html";
import strip from "strip-comments";
import unified from "unified";

export const sanitizeMarkdown = (markdown: string): string => {
  let sanitizedMarkdown = "";

  // Dev.to sometimes turns "# header" into "#&nbsp;header"
  const replaceSpaceCharRegex = new RegExp(String.fromCharCode(160), "g");
  sanitizedMarkdown = markdown.replace(replaceSpaceCharRegex, " ");

  // Dev.to allows headers with no space after the hashtag (I don't use # on Dev.to due to the title)
  const addSpaceAfterHeaderHashtagRegex = /##(?=[a-z|A-Z])/g;
  return sanitizedMarkdown.replace(addSpaceAfterHeaderHashtagRegex, "$& ");
};

export const convertMarkdownToHtml = (markdown: string): string => {
  const { content } = matter(markdown);

  const html = unified()
    .use(parse)
    .use(gfm)
    .use(remarkHtml)
    .processSync(content).contents;

  return strip(String(html));
};
