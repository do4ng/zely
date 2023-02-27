import * as zit from './zitjs';

import MainPage from './pages';
import docs from './pages/guide';
import page404 from './pages/404';
import version01 from './pages/versions/0.1';
import '../styles/documents.scss';

import prexty from './pages/prexty';
import link from './link';

if (window.location.pathname === '/announce/0.1') {
  window.location.replace('https://github.com/do4ng/prext/issues/7');
}

// components

// https://zitjs.netlify.app/guide/api-component
class Announcement extends zit.ZitComponent {
  constructor() {
    super();
    this.component.name = 'app-announcement';
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return zit.html`<a href="/guide/announce-v1">${zit.createElement(
      {
        tag: 'div',
        attributes: { class: 'announcement-card' },
      },
      zit.html`<div class="announcement-card-container">
        <div class="announcement-card-title">Prext v1.0 is in beta!</div>
        <div class="announcement-card-content">see Announcement!</div>
      </div></a>`
    )}`;
  }
}

zit.defineComponent(Announcement);

// https://zitjs.netlify.app/guide/api-router
zit.useRouter(
  {
    '/': MainPage,
    // @ts-ignore
    '/guide/:slug': docs,
    '/prexty/:slug': prexty,
    '/announce/version0-1': version01,
    '/link/:slug': link,
    '/l/:slug': link,
    __404: page404,
  },
  document.getElementById('app') as HTMLElement
);
