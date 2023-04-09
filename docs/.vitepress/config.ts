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
      { text: 'Blog', link: sidebarBlog()[0].items[0].link },
      {
        text: `v${pkg.version}`,
        items: [
          {
            text: 'CHANGELOG',
            link: 'https://github.com/do4ng/prext/blob/main/packages/prext/CHANGELOG.md',
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
    {
      text: 'Posts',
      collapsed: false,
      items: [
        { text: 'v1.3', link: '/blog/v1-3' },
        { text: 'v1.2', link: '/blog/v1-2' },
        { text: 'v1.0', link: '/blog/v1-0' },
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
        { text: 'Build', link: '/guide/guide-build' },
        { text: 'Page Data', link: '/guide/guide-page' },
      ],
    },
    {
      text: 'Community',
      collapsed: false,
      items: [{ text: 'Contributing', link: '/guide/contributing' }],
    },
  ];
}
