# craete prext app

[github](https://github.com/do4ng/prext/tree/main/packages/create-prext),
[npm](https://npmjs.com/package/create-prext-app)

`create-prext-app` is a tool that helps you create prext app easily.

::: warning
This package is no longer maintained. Use [create-prext](/guide/pkg-create-prext) instead.
:::

## Usage

```bash
> npx create-prext-app my-app --with-typescript
```

## Options

### with typescript

To clone typescript template, add `--with-typescript` flag.

### with javascript

To clone javascript template, add `--with-javascript` flag.

### react

To clone react template, add `--react` flag.

### All Commands

```txt
npx create-prext-app -h

  Usage
    $ prext <command> [options]

  Commands

  Options
    --help, -h           Displays help information.
    --version, -v        Displays current version.
    --with-javascript    Javascript template (default true)
    --with-typescript    Typescript template
    --react              Prexty (react) template

  Run `prext <command> --help` for more information.

```
