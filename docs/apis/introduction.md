# Javascript Apis

## `package.exports`

```json
"exports": {
  ".": {
    "require": "./dist/index.js",
    "import": "./dist/index.esm.js",
    "types": "./types/index.d.ts"
  },
  "./config": {
    "require": "./dist/config.js",
    "import": "./dist/config.esm.js",
    "types": "./types/export-config.d.ts"
  },
  "./server": {
    "require": "./dist/server.js",
    "import": "./dist/server.esm.js",
    "types": "./types/export-server.d.ts"
  }
}
```
