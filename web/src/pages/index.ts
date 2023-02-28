import { html } from '../zitjs';
import global from '../../config/global.json';

export const header = html` <div id="header">
  <div id="header-container">
    <div id="header-title"><a href="/">${global.name}</a></div>

    <ul id="header-contents">
      <li>
        <a href="${global.entry}">Guide</a>
      </li>
      <li>
        <a href="/prexty/introduction">Prexty</a>
      </li>
      <li>
        <a href="${global.github}">Github</a>
      </li>
    </ul>
  </div>
</div>`;

export default {
  template: html`
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

      <div id="example">
        <app-announcement></app-announcement>

        <div class="feature-animation">
          <div class="ex-bash">
            <pre class="bash-container">~root npm dev</pre>
          </div>
          <div class="feature-animation-des">
            <h2>👋 Good Bye to waiting time</h2>
          </div>
        </div>

        <div class="ex-container">
          <div class="ex-des">
            <h2>File Based Routing</h2>
            <span>Prext.js creates routes automatically with filenames.</span>
          </div>

          <div class="ex-box">
            <!--items-->
            <div class="example-item">
              <code>/pages/<span style="color: red">index</span>.ts</code>
              <code class="ex-result">/</code>
            </div>

            <div class="example-item">
              <code>/pages/<span style="color: blue">items</span>.ts</code>
              <code class="ex-result">/<span style="color: blue">items</span></code>
            </div>

            <div class="example-item">
              <code
                >/pages/<span style="color: blue">item</span>/<span style="color: green"
                  >$id</span
                >.ts</code
              >
              <code class="ex-result"
                >/<span style="color: blue">item</span>/<span style="color: green"
                  >:id</span
                ></code
              >
            </div>
          </div>
        </div>

        <div class="ex-container">
          <div class="ex-box">
            <div class="ex-browser">
              <div class="browser-url">
                <div class="browser-url-in">localhost:3000/item/215</div>
              </div>
              <div class="browser-view console" id="view-reload">{}</div>
            </div>
          </div>
          <div class="ex-des">
            <h2>Server Reload</h2>
            <span>You don't have to restart server to apply changes.</span>
          </div>
        </div>

        <div class="ex-container">
          <div class="ex-des">
            <h2>Lightning fast</h2>
            <span>faster compared to other frameworks.</span>
          </div>
          <div class="ex-box">
            <pre
              class="shiki material-palenight"
              style="background-color: #292D3E"
            ><code><span class="line"><span style="color: #A6ACCD">&gt; prext dev</span></span>
<span class="line"><span style="color: #A6ACCD"></span></span>
<span class="line"><span style="color: #A6ACCD">Server is Running~!</span></span>
<span class="line"><span style="color: #A6ACCD">Done in 0.01s</span></span></code></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-main">Copyright © 2023-present do4ng</div>
  `,
  js: () => {
    document.title = 'prext';

    const header = document.getElementById('header');
    header.setAttribute('style', 'border: #ffffff00; background-color: #ffffff00;');

    document.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        header.setAttribute('style', '');
      } else {
        header.setAttribute('style', 'border: #ffffff00; background-color: #ffffff00;');
      }
    });

    // bash

    const bash = document.querySelector('.bash-container');
    const bashScripts = [
      'Compiling Typescript...',
      'Compiling Assets...',
      'Starting Server...',
    ];
    const errorReaction = 'what the *!@!#$%';

    bash.innerHTML =
      '<code class="bash">~root npm dev</code><br><code class="bash">$ damn framework@1.2.3</code><br>';

    let count = 0;
    const view = setInterval(() => {
      bash.innerHTML += `<br><code class="bash">${bashScripts[count]}</code>`;
      count += 1;
      if (count === bashScripts.length) {
        clearInterval(view);

        setTimeout(() => {
          bash.innerHTML +=
            '<br><br><code class="bash" style="color: red">ERROR: cannot read properties of undefined</code><br><code class="bash">Done in 7s!</code><br><br><code class="bash">~root</code>';

          count = 0;

          setTimeout(() => {
            const reaction = setInterval(() => {
              bash.innerHTML += errorReaction[count];
              count += 1;

              if (count === errorReaction.length) {
                clearInterval(reaction);
              }
            }, 50);
          }, 500);
        }, 1000);
      }
    }, 2500);
    // browser view
    const el = document.getElementById('view-reload');

    const data = [
      { id: 215 },
      { id: 215, name: 'Awesome Juice' },
      { id: 215, name: 'Awesome Juice', price: 0.5 },
      {
        id: 215,
        name: 'Awesome Juice',
        price: 0.5,
        message: 'Observer is watching your app!',
      },
    ];

    if (el) {
      let count = 0;
      const view = setInterval(() => {
        el.innerHTML = JSON.stringify(data[count], null, 2);
        count += 1;
        if (count === data.length) {
          clearInterval(view);
        }
      }, 1200);
    }
  },
};
