/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const { join } = require('path');
const { getHighlighter } = require('shiki');
const markdown = require('markdown-it');
const anchor = require('markdown-it-anchor');

async function parseMarkdown(md, raw) {
  return {
    html: md.render(raw),
  };
}

let result = {};

async function buildDoc(md, target, output) {
  result = {};
  const posts = fs.readdirSync(join(__dirname, `../docs/${target}`));

  for await (const post of posts) {
    console.log(`Parsing ${target}/${post}`);
    const parsed = await parseMarkdown(
      md,
      fs.readFileSync(join(__dirname, `../docs/${target}`, post)).toString()
    );

    result[post] = parsed;
  }

  fs.writeFileSync(
    join(__dirname, `../src/pages/${output}.json`),
    JSON.stringify(result)
  );
}

async function main() {
  // material-palenight
  // material-lighter
  // min-light
  const highlighter = await getHighlighter({ theme: 'material-palenight' });
  const md = new markdown({
    html: true,
    highlight: (code, lang) => highlighter.codeToHtml(code, { lang }),
  });

  md.use(require('markdown-it-container'), 'classname', {
    validate: (name) => name.trim().length,
    render: (tokens, idx) => {
      if (tokens[idx].nesting === 1) {
        return `<div class="block ${tokens[idx].info.trim()}">\n`;
      }
      return '</div>\n';
    },
  });

  md.use(anchor.default, {
    permalink: anchor.default.permalink.ariaHidden({ placement: 'before' }),
  });
  md.use(require('markdown-it-header-sections'));

  await buildDoc(md, 'guide', 'posts');
  await buildDoc(md, 'prexty', 'prexty');
  await buildDoc(md, 'plugins', 'plugins');
}

main();

console.log('');
