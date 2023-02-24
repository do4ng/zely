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
