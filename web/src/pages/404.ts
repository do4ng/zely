import { header } from '.';
import { html } from '../zitjs';

export default {
  template: html`
    ${header}
    <div class="page-404">
      <h1>404</h1>
      <span>page not found</span>
    </div>
  `,
};
