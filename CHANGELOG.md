## v1.2.1 (2021-10-19)

#### :bug: Bug Fix

- [#541](https://github.com/rwjblue/ember-holy-futuristic-template-namespacing-batman/pull/541) Avoid erroring while in `.gjs` / `.gts` files (e.g. strict mode)

#### Committers: 1

- Hank Majoros ([@hmajoros](https://github.com/hmajoros))

## v1.2.0 (2021-10-19)

#### :bug: Bug Fix
* [#456](https://github.com/rwjblue/ember-holy-futuristic-template-namespacing-batman/pull/456) Fix usage of `{{component 'some-string'}}` under Embroider (re-export the dynamic component helper into `app`) ([@thoov](https://github.com/thoov))

#### :house: Internal
* [#457](https://github.com/rwjblue/ember-holy-futuristic-template-namespacing-batman/pull/457) Fix CI for Ember 4 ([@rwjblue](https://github.com/rwjblue))

#### Committers: 3
- Robert Jackson ([@rwjblue](https://github.com/rwjblue))
- Travis Hoover ([@thoov](https://github.com/thoov))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v1.1.2 (2021-07-01)

#### :bug: Bug Fix
* [#449](https://github.com/rwjblue/ember-holy-futuristic-template-namespacing-batman/pull/449) Fix parallelization under Embroider builds ([@rwjblue](https://github.com/rwjblue))

#### Committers: 1
- Robert Jackson ([@rwjblue](https://github.com/rwjblue))

## v1.1.1 (2021-05-27)

#### :bug: Bug Fix
* [#436](https://github.com/rwjblue/ember-holy-futuristic-template-namespacing-batman/pull/436) Include no-op status in the cache key for the AST plugin ([@charlespierce](https://github.com/charlespierce))

#### :memo: Documentation
* [#424](https://github.com/rwjblue/ember-holy-futuristic-template-namespacing-batman/pull/424) Add note favoring ember-template-imports over this addon ([@pzuraq](https://github.com/pzuraq))

#### Committers: 2
- Charles Pierce ([@charlespierce](https://github.com/charlespierce))
- Chris Garrett ([@pzuraq](https://github.com/pzuraq))

## v1.1.0 (2021-02-12)

#### :rocket: Enhancement
* [#418](https://github.com/rwjblue/ember-holy-futuristic-template-namespacing-batman/pull/418) Add support for 'excludeNestedAddonTransforms' configuration setting ([@charlespierce](https://github.com/charlespierce))

#### Committers: 1
- Charles Pierce ([@charlespierce](https://github.com/charlespierce))

## v1.0.2 (2020-09-25)

#### :rocket: Enhancement
* [#394](https://github.com/rwjblue/ember-holy-futuristic-template-namespacing-batman/pull/394) Avoid `ember-resolver` version assertion when `ember-resolver` is not used ([@nlfurniss](https://github.com/nlfurniss))

#### Committers: 2
- Nathaniel Furniss ([@nlfurniss](https://github.com/nlfurniss))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v1.0.1 (2019-12-17)

#### :bug: Bug Fix
* [#245](https://github.com/rwjblue/ember-holy-futuristic-template-namespacing-batman/pull/245) Ensure `@injectService` works properly ([@srowhani](https://github.com/srowhani))
* [#270](https://github.com/rwjblue/ember-holy-futuristic-template-namespacing-batman/pull/270) Fix dependency check of ember-resolver in project ([@alias-mac](https://github.com/alias-mac))

#### :memo: Documentation
* [#236](https://github.com/rwjblue/ember-holy-futuristic-template-namespacing-batman/pull/236) Remove last trace of `::` in README and package.json ([@rwjblue](https://github.com/rwjblue))

#### :house: Internal
* [#278](https://github.com/rwjblue/ember-holy-futuristic-template-namespacing-batman/pull/278) Remove ember-cli-htmlbars-inline-precompile. ([@rwjblue](https://github.com/rwjblue))
* [#277](https://github.com/rwjblue/ember-holy-futuristic-template-namespacing-batman/pull/277) Increase browser start timeout to avoid CI timeout errors. ([@rwjblue](https://github.com/rwjblue))
* [#276](https://github.com/rwjblue/ember-holy-futuristic-template-namespacing-batman/pull/276) Add basic node-land test. ([@rwjblue](https://github.com/rwjblue))

#### Committers: 4
- Filipe Guerra ([@alias-mac](https://github.com/alias-mac))
- Robert Jackson ([@rwjblue](https://github.com/rwjblue))
- Seena Rowhani ([@srowhani](https://github.com/srowhani))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v1.0.0 (2019-10-01)

#### :boom: Breaking Change
* [#233](https://github.com/rwjblue/ember-holy-futuristic-template-namespacing-batman/pull/233) Remove support for `::` syntax ([@gabrielcsapo](https://github.com/gabrielcsapo))

#### Committers: 2
- Gabriel Csapo ([@gabrielcsapo](https://github.com/gabrielcsapo))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v0.2.0 (2019-10-01)

#### :boom: Breaking Change
* [#209](https://github.com/rwjblue/ember-holy-futuristic-template-namespacing-batman/pull/209) Drop Node 6, 7, 9, 11. Drop support for Ember < 3.4. ([@rwjblue](https://github.com/rwjblue))

#### :rocket: Enhancement
* [#235](https://github.com/rwjblue/ember-holy-futuristic-template-namespacing-batman/pull/235) Bring back the deprecations! ([@rwjblue](https://github.com/rwjblue))

#### Committers: 2
- Robert Jackson ([@rwjblue](https://github.com/rwjblue))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v0.1.8 (2019-08-28)

#### :bug: Bug Fix
* [#212](https://github.com/rwjblue/ember-holy-futuristic-template-namespacing-batman/pull/212) Version runtime helpers to avoid multi-version collisions. ([@rwjblue](https://github.com/rwjblue))
* [#211](https://github.com/rwjblue/ember-holy-futuristic-template-namespacing-batman/pull/211) Remove deprecations. ([@rwjblue](https://github.com/rwjblue))

#### Committers: 1
- Robert Jackson ([@rwjblue](https://github.com/rwjblue))

## v0.1.7 (2019-08-26)

#### :rocket: Enhancement
* [#205](https://github.com/rwjblue/ember-holy-futuristic-template-namespacing-batman/pull/205) Add deprecation for :: syntax usage. ([@rwjblue](https://github.com/rwjblue))
* [#203](https://github.com/rwjblue/ember-holy-futuristic-template-namespacing-batman/pull/203) Add support for using $ as a separator in addition to `::`. ([@rwjblue](https://github.com/rwjblue))

#### :bug: Bug Fix
* [#99](https://github.com/rwjblue/ember-holy-futuristic-template-namespacing-batman/pull/99) Ensure recent enough version of ember-resolver is present ([@gabrielcsapo](https://github.com/gabrielcsapo))

#### :memo: Documentation
* [#190](https://github.com/rwjblue/ember-holy-futuristic-template-namespacing-batman/pull/190) Update README with warning ([@pzuraq](https://github.com/pzuraq))

#### Committers: 4
- Chris Garrett ([@pzuraq](https://github.com/pzuraq))
- Gabriel Csapo ([@gabrielcsapo](https://github.com/gabrielcsapo))
- Robert Jackson ([@rwjblue](https://github.com/rwjblue))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

