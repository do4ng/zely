import { defineConfig } from 'vitepress';

import pkg from '../../packages/prext/package.json';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Prext',
  description: 'a Backend Framework for Node.js',

  cleanUrls: true,
  lastUpdated: true,

  head: [['meta', { name: 'theme-color', content: '#944cc2' }]],

  markdown: {
    theme: 'material-theme-palenight',
  },

  themeConfig: {
    editLink: { pattern: 'https://github.com/do4ng/prext/edit/main/docs/:path' },

    nav: [
      { text: 'Guide', link: '/guide/what-is-prext' },
      { text: 'APIs', link: '/apis/introduction' },
      { text: 'Config', link: '/apis/config' },
      { text: 'Blog', link: '/blog/introduction' },
      {
        text: `v${pkg.version}`,
        items: [
          {
            text: 'CHANGELOG',
            link: 'https://github.com/do4ng/prext/blob/main/packages/prext/CHANGELOG.md',
          },
          {
            items: [
              {
                text: 'v1 docs',
                link: 'https://642c254446f3190008a45c8b--prext.netlify.app/',
              },
              {
                text: 'v0 docs',
                link: 'https://63d5367b5e458b7e0ce3f315--prext.netlify.app/',
              },
            ],
          },
        ],
      },
    ],

    sidebar: {
      '/guide/': sidebarGuide(),
      '/apis/': sidebarApis(),
      '/blog/': sidebarBlog(),
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/do4ng/prext' }],
  },
});

function sidebarBlog() {
  return [
    { text: 'Intro', items: [{ text: 'Introduction', link: '/blog/introduction' }] },
    {
      text: 'Posts',
      collapsed: true,
      items: [
        { text: 'Introduce v2.0', link: '/blog/v2-0' },
        { text: 'v2.0 is coming', link: '/blog/dev-v2-0' },
        { text: 'New Docs', link: '/blog/new-docs' },
        { text: 'Introduce v1.3', link: '/blog/v1-3' },
        { text: 'Introduce v1.2', link: '/blog/v1-2' },
        { text: 'Introduce v1.0', link: '/blog/v1-0' },
      ],
    },
  ];
}

function sidebarApis() {
  return [
    {
      text: 'Javascript Apis',
      collapsed: false,
      items: [
        { text: 'Introduction', link: '/apis/introduction' },
        { text: 'Server', link: '/apis/server' },
        { text: 'Plugin', link: '/apis/plugin' },
        { text: 'Osik', link: '/apis/osik' },
      ],
    },
    {
      text: 'Config References',
      collapsed: false,
      items: [{ text: 'Config', link: '/apis/config' }],
    },
  ];
}

function sidebarGuide() {
  return [
    {
      text: 'Introduction',
      collapsed: false,
      items: [
        { text: 'What is Prext?', link: '/guide/what-is-prext' },
        { text: 'Getting Started', link: '/guide/getting-started' },
        { text: 'Routing', link: '/guide/routing' },
        { text: 'Middlewares', link: '/guide/middlewares' },
        { text: 'Typescript', link: '/guide/typescript' },
        { text: 'Build', link: '/guide/build' },
        { text: 'Page Data', link: '/guide/page' },
        { text: 'Plugin', link: '/guide/plugin' },
        { text: 'Data Fetching', link: '/guide/fetch' },
      ],
    },
    {
      text: 'Community',
      collapsed: false,
      items: [{ text: 'Contributing', link: '/guide/contributing' }],
    },
  ];
}
