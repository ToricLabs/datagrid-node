# 👋 Wondering what everything in here does?

`datagrid-sandbox` supports a wide variety of runtime environments like Node.js, Deno, Bun, browsers, and various
edge runtimes, as well as both CommonJS (CJS) and EcmaScript Modules (ESM).

To do this, `datagrid-sandbox` provides shims for either using `node-fetch` when in Node (because `fetch` is still experimental there) or the global `fetch` API built into the environment when not in Node.

It uses [conditional exports](https://nodejs.org/api/packages.html#conditional-exports) to
automatically select the correct shims for each environment. However, conditional exports are a fairly new
feature and not supported everywhere. For instance, the TypeScript `"moduleResolution": "node"`

setting doesn't consult the `exports` map, compared to `"moduleResolution": "nodeNext"`, which does.
Unfortunately that's still the default setting, and it can result in errors like
getting the wrong raw `Response` type from `.asResponse()`, for example.

The user can work around these issues by manually importing one of:

- `import 'datagrid-sandbox/shims/node'`
- `import 'datagrid-sandbox/shims/web'`

All of the code here in `_shims` handles selecting the automatic default shims or manual overrides.

### How it works - Runtime

Runtime shims get installed by calling `setShims` exported by `datagrid-sandbox/_shims/registry`.

Manually importing `datagrid-sandbox/shims/node` or `datagrid-sandbox/shims/web`, calls `setShims` with the respective runtime shims.

All client code imports shims from `datagrid-sandbox/_shims/index`, which:

- checks if shims have been set manually
- if not, calls `setShims` with the shims from `datagrid-sandbox/_shims/auto/runtime`
- re-exports the installed shims from `datagrid-sandbox/_shims/registry`.

`datagrid-sandbox/_shims/auto/runtime` exports web runtime shims.
If the `node` export condition is set, the export map replaces it with `datagrid-sandbox/_shims/auto/runtime-node`.

### How it works - Type time

All client code imports shim types from `datagrid-sandbox/_shims/index`, which selects the manual types from `datagrid-sandbox/_shims/manual-types` if they have been declared, otherwise it exports the auto types from `datagrid-sandbox/_shims/auto/types`.

`datagrid-sandbox/_shims/manual-types` exports an empty namespace.
Manually importing `datagrid-sandbox/shims/node` or `datagrid-sandbox/shims/web` merges declarations into this empty namespace, so they get picked up by `datagrid-sandbox/_shims/index`.

`datagrid-sandbox/_shims/auto/types` exports web type definitions.
If the `node` export condition is set, the export map replaces it with `datagrid-sandbox/_shims/auto/types-node`, though TS only picks this up if `"moduleResolution": "nodenext"` or `"moduleResolution": "bundler"`.
