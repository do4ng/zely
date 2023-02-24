import { header } from './pages';
import { createElement, html } from './zitjs';

export const LINK_MAP = {
  sard: '/guide/pkg-sard',
  'create-prext-app': '/guide/pkg-create-prext-app',
  'prext-analyst': '/guide/pkg-prext-analyst',
  prexty: '/guide/pkg-prexty',
  'prexty-doc': '/prexty/introduction',
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
