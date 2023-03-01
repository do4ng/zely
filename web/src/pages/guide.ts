import { createElement, html } from '../zitjs';

import posts from '../../config/config.json';
import docs from './posts.json';
// import global from '../../config/global.json';

import { header } from './index';

const postList: string[] = [];
const titleList: string[] = [];

posts.forEach((post) => {
  post.posts.forEach((p) => {
    postList.push(p[0]);
    titleList.push(p[1]);
  });
});
if (window.location.pathname === '/guide/api-sard') {
  window.location.replace('/guide/pkg-sard');
}

let sliced = window.location.pathname.split('/');
let now = sliced[sliced.length - 1];
let next = postList[postList.indexOf(now) + 1];
let pre = postList[postList.indexOf(now) - 1];

const post = createElement(
  { tagName: 'div', attributes: { class: 'post-container' } },
  html`<div class="post">
    <div class="post-p">
      <div class="post-main">{{text}}</div>
      <div class="table-contents-container">{{tableOfContents}}</div>
    </div>
    <div class="pre-next">{{prePage}}{{nextPage}}</div>
  </div>`
);

const template = createElement(
  { tag: undefined },
  html`${header}
    <div class="container">{{side}}${post()}</div>`
);

export default {
  template,
  beforeLoad: async ({ params }) => {
    // update data
    sliced = window.location.pathname.split('/');
    now = sliced[sliced.length - 1];
    next = postList[postList.indexOf(now) + 1];
    pre = postList[postList.indexOf(now) - 1];
    const text = docs[`${params.slug}.md`];

    // console.log(text, params.slug);

    document.title = `${titleList[postList.indexOf(now)]} - Prext`;

    const sideList = createElement(
      { tagName: 'div', attributes: { class: 'side-list' } },
      html`
        ${posts
          .map(
            (category) => html` <!-- side -->
              <div class="category">
                <div class="category-name">${category.category}</div>
                <div class="category-content">
                  ${category.posts.map(
                    (post) => html` <div
                      class="category-post ${post[0] === params.slug ? 'active' : ''}"
                    >
                      <a
                        href="/guide/${post[0]}"
                        class="${post[0] === params.slug ? 'active' : ''}"
                        ><p>${post[1]}</p></a
                      >
                    </div>`
                  )}
                </div>
              </div>`
          )
          .join('')}
      `
    );

    // table of contents

    const virtualComponent = document.createElement('div');

    virtualComponent.innerHTML = text.html;

    const h2 = virtualComponent.querySelectorAll('h2');
    const tree: Array<{
      id: string;
      text: string;
      children: { id: string; text: string }[];
    }> = [];
    const anchors: HTMLElement[] = [];

    h2.forEach((tag) => {
      const children = [];
      anchors.push(tag);
      tag.parentElement.querySelectorAll('h3')?.forEach((h3Tag) => {
        console.log(h3Tag.parentElement);
        children.push({
          id: h3Tag.parentElement.id,
          text: h3Tag.innerText.slice(2),
        });
        anchors.push(h3Tag);
      });
      tree.push({
        id: tag.parentElement.id,
        text: tag.innerText.slice(2),
        children,
      });
    });

    const TableContents = createElement(
      { tag: 'div', attributes: { class: 'table-of-contents' } },
      html`<div>
        ${tree.map(
          (component) =>
            html`<div class="table-item">
              <a href="#${component.id}" id="table-${component.id}"
                ><p>${component.text}</p></a
              >
              <div class="table-item-child-container">
                ${component.children.length !== 0
                  ? html`${component.children.map(
                      (child) =>
                        html`<div class="table-item-child">
                          <a href="#${child.id}" id="table-${child.id}"
                            ><p>${child.text}</p></a
                          >
                        </div>`
                    )}`
                  : ''}
              </div>
            </div>`
        )}
      </div>`
    );

    return {
      text: text.html,
      prePage: pre
        ? `<a href="/guide/${pre}" pre>
      <div class="prext">
        <div class="prext-title">Previous Page</div>
        <div class="prext-content">${titleList[postList.indexOf(pre)]}</div>
      </div></a>`
        : '',
      nextPage: next
        ? `<a href="/guide/${next}" next>
        <div class="prext">
          <div class="prext-title">Next Page</div>
          <div class="prext-content">${titleList[postList.indexOf(next)]}</div>
        </div>
        </a>`
        : '',
      tableOfContents: TableContents(),
      side: sideList(),
    };
  },
  js: (slug) => {
    const text = docs[`${slug.slug}.md`];
    const virtualComponent = document.createElement('div');

    virtualComponent.innerHTML = text.html;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const { id } = entry.target;
        const target = document.getElementById(`table-${id}`);
        if (entry.intersectionRatio > 0) {
          target.classList.add('table-active');
        } else {
          target.classList.remove('table-active');
        }
      });
    });

    const h2 = virtualComponent.querySelectorAll('h2');

    h2.forEach((tag) => {
      console.log(tag.parentElement.id);
      io.observe(document.getElementById(tag.parentElement.id));
      tag.parentElement.querySelectorAll('h3')?.forEach((h3Tag) => {
        io.observe(document.getElementById(h3Tag.parentElement.id));
      });
    });
  },
};
