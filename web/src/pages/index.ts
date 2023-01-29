import { html } from "../zitjs";
import global from "../../config/global.json";

export const header = html` <div id="header">
  <div id="header-container">
    <div id="header-title"><a href="/">${global.name}</a></div>

    <ul id="header-contents">
      <li>
        <a href="${global.entry}">Guide</a>
      </li>
      <li>
        <a href="${global.github}">Github</a>
      </li>
    </ul>
  </div>
</div>`;

export default html`
  ${header}
  <div id="main">
    <div id="title">
      <div class="flex-container">
        <div>
          <div id="title-content">
            <h1>${global.name}</h1>
            <p id="title-detail">${global.description}</p>
            <div id="title-dir">
              <button class="tb shadow">
                <a href="${global.entry}">get started</a>
              </button>
              <button class="tb shadow">
                <a href="${global.github}">view on github</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="example"></div>
  </div>
`;
