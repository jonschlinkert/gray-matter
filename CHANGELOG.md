# Release history

## 5.0.0 - 2022-07-20

- Core code moved to ES Modules syntax
- All dependencies updated to latest versions (including some major version bumps)
- Library now exports ESM, CJS, and types
- Note: _types_ were manually handcrafted in prior releases but not included in the package.json's "types" property.

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
