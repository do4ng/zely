import * as zit from './zitjs';

import MainPage from './pages';
import docs from './pages/guide';
import page404 from './pages/404';

import '../styles/documents.scss';
import prexty from './pages/prexty';

if (window.location.pathname === '/announce/0.1') {
  window.location.replace('https://github.com/do4ng/prext/issues/7');
}

zit.useRouter(
  {
    '/': MainPage,
    // @ts-ignore
    '/guide/:slug': docs,
    '/prexty/:slug': prexty,
    __404: page404,
  },
  document.getElementById('app') as HTMLElement
);
