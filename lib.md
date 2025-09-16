Overview

This document describes the public API exported by `lib.min.mjs` (exported symbol `_`).

The module exposes a single root object `_` with the following top-level namespaces:

- `DATA` — runtime data holders used by the app (cfg, fs, lookup tables, RDF, etc.).
- `X` — general-purpose utilities: parsing, filtering, statistics, and helpers.
- `R` — RDF-like builder/helpers and many indexed/filtered transforms.
- `H` — hierarchy helpers and DOM operations for hierarchical trees.
- `U` — small utilities (number formatting, HTTP helper, DOM helpers).
- `I` — icon helpers (SVG symbol creation and assembly).
- `M` — modal/dialog helper utilities for creating forms and modals.
- `Y` — UI small widgets and icon/button factories.
- `L` — layout helpers that wrap `Y` methods to produce nodes used in tables.
- `T` — table management: rendering tables, paging, filters, sorting, refresh.
- `D` — data helpers (fetching, clipboard export, describe/stats views).
- `C` — cloud/backend connectors (API id, region, Dynamo-like helpers).

Usage

Import the module and use the root `_` object directly:

```js
import { _ } from './lib.min.mjs';

// Access utilities
const stats = _.X.bxpl([1,2,3,4]);
console.log(stats.mean);

// Render table into a container with id 'mytable'
// Assumes _.DATA and configurations exist and are populated.
_.T.rf('mytable');
```

Key APIs (summary)

- `_.X` — Useful functions:
  - `version()` — returns version info.
  - `buzZ(text, minWordLen=7)` — word frequency extractor (top 50).
  - `bxpl(array)` — basic box-plot stats: min/q1/mean/median/q3/max/stddev.
  - `fc`, `mfms`, `describe`, `search` — filtering/search helpers used by table logic.

- `_.T` — Table rendering and interactions:
  - `getTbl(cfgName, rows, structure)` — returns a DOM `div` containing the table.
  - `rf(cfgName)` — refreshes container `#<cfgName>` with current data.
  - `sF(cfgName, filterObj, filterKey)` — set a JSON filter and refresh.
  - `sC(cfgName, col, sortMode, numericFlag)` — set sort and refresh.
  - `gP(cfgName, delta, forward)` — pager control.

- `_.M` — Modal helpers to create interactive forms and handle save callbacks.
  - `sM(title, subtitle, fields, formRenderer='gf', btnFactory='bt', ...)` — show modal.

- `_.C` — Cloud backend helpers (defaults must be configured):
  - `m2eda(payload, task, table)` — send POST to API Gateway endpoint configured by `_.C.APIID/REGION`.
  - `del({k,o}, cfgName)` — delete an item and update local caches.
  - `upd({k,o,v,t,c})` — update an item.
  - `scanDB(tableName, query)` — run a query via backend.

DOM helpers and UI

- `_.Y.setIcon(id, class, title)` — returns an SVG `element` referencing symbol `#id`.
- `_.Y.i2m(...)`, `i2c`, `del`, `upd`, `up` — create small action buttons bound to modal/backend calls.
- `_.L` provides rendering helpers used to convert raw field values into table cell nodes (value formatting, barcode, meters).

Data and configuration expectations

- The code expects `_.DATA` to contain application data arrays and per-table configurations under keys like `cfg_<name>` and `fs_<name>` for filtered rows.
- Example configuration keys used by table rendering: `cfg.<structure>`, `cfg.view`, `cfg.page`, `cfg.pageSize`, `cfg.dbTableName`, `cfg.ReadKeys`.

Notes & Caveats

- The file is minified and intended to be used as a client-side utility library. Many functions assume DOM elements exist with specific ids (e.g. `main`, `#formsave`, `#rdfinfo`, `#aside`).
- Several functions mutate `_.DATA` in place and rely on configuration conventions — inspect the original (non-minified) source for exact schemas if available.
- `_.C` requires `APIID`, `REGION`, and table names to be set before using network functions.

Suggestions for improving documentation

- Provide an example `_.DATA` minimal config for a single table (structure + sample rows).
- Provide a small HTML example showing required elements (`main`, `aside`, `formsave`, target container).
- Unminify the source and extract JSDoc comments for each public function for precise parameter and return types.

Appendix: Quick example to render a table

```html
<!-- minimal HTML -->
<div id="main"></div>
<button id="formsave">Save</button>
<div id="mytable"></div>

<script type="module">
  import { _ } from './lib.min.mjs';

  // Minimal DATA and cfg setup
  _.DATA['mytable'] = [ { _id: '1', name: 'Alice', age: '30' }, { _id: '2', name: 'Bob', age: '40' } ];
  _.DATA['cfg_mytable'] = {
    cfg: { page: 0, pageSize: 20, maxPage: 1, view: 'show', startstop: false, sort: ['dos','_id',false] },
    structure: { 0: { col: 'name', head: 'Name', style: 'nn' }, 1: { col: 'age', head: 'Age', style: 'nn' } },
    views: { show: { 0: { col: 'name', head: 'Name' }, 1: { col: 'age', head: 'Age' } } }
  };

  _.T.rf('mytable');
</script>
```
