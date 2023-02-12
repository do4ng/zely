import * as zit from './zitjs';

import MainPage from './pages';
import docs from './pages/guide';
import page404 from './pages/404';

import '../styles/documents.scss';
import prexty from './pages/prexty';

(zit as any).useRouter(
  {
    '/': MainPage,
    // @ts-ignore
    '/guide/:slug': docs,
    '/prexty/:slug': prexty,
    __404: page404,
  },
  document.getElementById('app') as HTMLElement
);
