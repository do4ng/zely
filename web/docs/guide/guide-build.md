# Build

You can export your backend application!

Although you didn't install dependencies or removed pages by mistake, you can start server with this feature.

This feature creates a ready-to-run javascript file like an executable like `exe`.

## Example

Run:

```bash
> prext export
```

will create `dist/index.js`. And check if it works well.

```bash
> node dist/index.js
```

Then, remove `node_modules` and `pages`!

```bash
> rimraf node_modules
> rimraf pages
```

Check again if it works.

```bash
> node dist/index.js
```

## Usage

```bash
> prext export -h

  Usage
    $ prext export

  Export Prext Server

  Options
    --help, -h       Displays help information.
    --version, -v    Displays current version.
    --config, -c     Provide config file path.
```

## Warning

This feature doesn't support html and middlewares.
