import { header } from './pages';
import { createElement, html } from './zitjs';

export const LINK_MAP = {
  sard: '/guide/pkg-sard',
  'create-prext-app': '/guide/pkg-create-prext-app',
  'prext-analyst': '/guide/pkg-prext-analyst',
  prexty: '/guide/pkg-prexty',
  'prexty-doc': '/prexty/introduction',
  changelog:
    'https://github.com/do4ng/prext/blob/main/packages/prext/CHANGELOG.md#010-2023-02-21',
};

export default {
  template: createElement(
    null,
    html`${header}
      <h2 class="linking">Linking /{{slug}}...</h2>`
  ),
  js({ slug }) {
    if (Object.hasOwn(LINK_MAP, slug)) {
      window.location.replace(`${LINK_MAP[slug]}`);
    } else {
      document.querySelector('.linking').innerHTML = `Couldn't find /${slug} page.`;
    }
  },
};
