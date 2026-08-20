# Release history

## 5.0.0 - 2026-08-20

### Breaking changes

- Converted to pure ES modules (`type: "module"`). The package is no longer consumable via CommonJS `require()`; use `import` instead.
- Now requires node v20.19.0 or higher.

### Changed

- Added an `exports` map with support for the package root, `./lib/*` subpaths and `./package.json`.

### Removed

- Dropped support for node 6–18.

## 4.0.0 - 2018-04-01

### Breaking changes

- Now requires node v4 or higher. 


## 3.0.0 - 2017-06-30

### Breaking changes

- `toml`, `coffee` and `cson` are no longer supported by default. Please see [`options.engines`](README.md#optionsengines) and the [examples](./examples) to learn how to add engines.

### Added

- Support for [excerpts](README.md#optionsexcerpt).
- The returned object now has non-enumerable `matter` and `stringify` properties.

### Changed

- Refactored engines (parsers), so that it's easier to add parsers and stringifiers.
- `options.parsers` was renamed to [`options.engines`](README.md#optionsengines)
