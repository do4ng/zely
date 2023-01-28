import { html } from '../zitjs';

export default html`
  <div id="header">
    <div id="header-container">
      <div id="header-title">Prext</div>

      <ul id="header-contents">
        <li>
          <a href="/guide/what-is-prext">Guide</a>
        </li>
        <li>
          <a href="https://github.com/do4ng/prext">Github</a>
        </li>
      </ul>
    </div>
  </div>

  <div id="main">
    <div id="title">
      <div class="flex-container">
        <div>
          <div id="title-content">
            <h1>Prext.js</h1>
            <p id="title-detail">File-based routing nodejs backend framework.</p>
            <div id="title-dir">
              <button class="tb shadow">
                <a href="/guide/what-is-prext">get started</a>
              </button>
              <button class="tb shadow">
                <a href="https://github.com/do4ng/prext">view on github</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="example"></div>
  </div>
`;
