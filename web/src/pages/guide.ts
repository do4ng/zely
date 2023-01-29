import { createElement, html } from "../zitjs";

import global from "../../config/global.json";
import posts from "../../config/config.json";
import docs from "./posts.json";

import { header } from "./index";

const postList: string[] = [];
const titleList: string[] = [];

posts.forEach((post) => {
  post.posts.forEach((p) => {
    postList.push(p[0]);
    titleList.push(p[1]);
  });
});

let sliced = window.location.href.split("/");
let now = sliced[sliced.length - 1];
let next = postList[postList.indexOf(now) + 1];
let pre = postList[postList.indexOf(now) - 1];

const post = createElement(
  { tagName: "div", attributes: { class: "post-container" } },
  html`<div class="post">
    {{text}}
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
    sliced = window.location.href.split("/");
    now = sliced[sliced.length - 1];
    next = postList[postList.indexOf(now) + 1];
    pre = postList[postList.indexOf(now) - 1];
    const text = docs[`${params.slug}.md`];

    console.log(text, params.slug);
    const sideList = createElement(
      { tagName: "div", attributes: { class: "side-list" } },
      `
    ${posts
      .map(
        (category) => html` <!-- side -->
          <div class="category">
            <div class="category-name">${category.category}</div>
            <div class="category-content">
              ${category.posts.map(
                (post) => html` <div
                  class="category-post ${post[0] === params.slug
                    ? "active"
                    : ""}"
                >
                  <a
                    href="/guide/${post[0]}"
                    class="${post[0] === params.slug ? "active" : ""}"
                    >${post[1]}</a
                  >
                </div>`
              )}
            </div>
            <div class="footer"></div>
          </div>`
      )
      .join("")}
    `
    );

    return {
      text: text.html,
      prePage: pre
        ? `<a href="/guide/${pre}" pre>
      <div class="prext">
        <div class="prext-title">Previous Page</div>
        <div class="prext-content">${titleList[postList.indexOf(pre)]}</div>
      </div></a>`
        : "",
      nextPage: next
        ? `<a href="/guide/${next}" next>
        <div class="prext">
          <div class="prext-title">Next Page</div>
          <div class="prext-content">${titleList[postList.indexOf(next)]}</div>
        </div>
        </a>`
        : "",
      side: sideList(),
    };
  },
  js: () => {},
};
