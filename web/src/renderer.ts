import * as zit from './zitjs';

import MainPage from './pages';
import docs from './pages/guide';
import page404 from './pages/404';

import '../styles/documents.scss';

(zit as any).useRouter(
  {
    '/': {
      template: MainPage,
    },
    // @ts-ignore
    '/guide/:slug': docs,
    __404: page404,
  },
  document.getElementById('app') as HTMLElement
);
