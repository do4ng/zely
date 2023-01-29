/* eslint-disable no-restricted-syntax */
const fs = require("fs");
const { join } = require("path");
const { getHighlighter } = require("shiki");
const markdown = require("markdown-it");

async function parseMarkdown(highlighter, raw) {
  const md = new markdown({
    html: true,
    highlight: (code, lang) => highlighter.codeToHtml(code, { lang }),
  });

  return {
    html: md.render(raw),
  };
}

const posts = fs.readdirSync(join(__dirname, "../docs/guide"));

const result = {};

async function main() {
  const highlighter = await getHighlighter({ theme: "material-palenight" });

  for await (const post of posts) {
    console.log(`Parsing ${post}`);
    const parsed = await parseMarkdown(
      highlighter,
      fs.readFileSync(join(__dirname, "../docs/guide", post)).toString()
    );

    result[post] = parsed;
  }

  fs.writeFileSync(
    join(__dirname, "../src/pages/posts.json"),
    JSON.stringify(result)
  );
}

main();
