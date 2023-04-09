<app-announcement>
</app-announcement>

# What is Prext

🛰️ Prext is a backend framework for Node.js.

## Features

- **🚧 File-based routing.** Prext.js creates routes automatically with filenames.
- **🚀 Server Reload.** You don't have to restart server to apply changes.
- **✅ Typescript Supported.**
- **⚡ Lightning fast.** Prext uses [esbuild](https://esbuild.github.io/) as javascript loader.

## Introduction

Prext.js (previous + next) is a node.js backend framework inspired by [next](https://nextjs.org/). This project aims to be the lightest Nodejs backend framework.

Prext is running on [osik](https://npmjs.com/package/osik) which was made for speed and weight. It also uses [esbuild](https://esbuild.github.io/) to reduce compile time.

## Why you made it?

The current nodejs backend library/framework has the problems:

### Too slow

For example, if you simply want to create an express server which outputs Hello World using typescript. Then you have to install some dependencies, write the code, and use tsc to convert the `.ts` file to the `.js` file and run it.

This process is really complicated compared to the results. Also, compiling with js takes a lot of time. (Although using a quick bundleer such as esbuild will solve it)

### Annoying to set routing

Taking express as an example again, I want to create an sns backend system, but the more requests are received through routes such as `/post/*` and `/user/*`, the more cumbersome it is to set up routing.

### Solution

Prext solves these problems. It has many features such as file based routing, fastest server, etc,
