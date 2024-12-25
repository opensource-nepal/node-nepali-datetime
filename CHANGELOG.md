# CHANGELOG

## [1.4.0](https://github.com/opensource-nepal/node-nepali-datetime/compare/v1.3.0...v1.4.0) (2024-12-25)


### Features

* add static method `getDaysOfMonth` on NepaliDate ([#96](https://github.com/opensource-nepal/node-nepali-datetime/issues/96)) ([c85edfa](https://github.com/opensource-nepal/node-nepali-datetime/commit/c85edfa4d40f93061674f6143f6343b23a653bc0))
* add static methods for min and max supported dates ([#102](https://github.com/opensource-nepal/node-nepali-datetime/issues/102)) ([6b13079](https://github.com/opensource-nepal/node-nepali-datetime/commit/6b130794cbaad396e7e4a648163a346de0f6cdbb))
* add support for node 22 and remove 16 ([#101](https://github.com/opensource-nepal/node-nepali-datetime/issues/101)) ([3254f8d](https://github.com/opensource-nepal/node-nepali-datetime/commit/3254f8de6b384c4078117949feb51b3c2a93900d))


### Bug Fixes

* update nepali months data ([#103](https://github.com/opensource-nepal/node-nepali-datetime/issues/103)) ([b19d135](https://github.com/opensource-nepal/node-nepali-datetime/commit/b19d135f0a7a610a2858e230924b4420cc70f1f9))

## [1.3.0](https://github.com/opensource-nepal/node-nepali-datetime/compare/v1.2.1...v1.3.0) (2024-11-30)


### Features

* add method `formatEnglishDate` and `formatEnglishDateInNepali` ([#94](https://github.com/opensource-nepal/node-nepali-datetime/issues/94)) ([6cf9d14](https://github.com/opensource-nepal/node-nepali-datetime/commit/6cf9d142e5193e246b546f8599411efbf4e2a014))
* add method `parseEnglishDate` for English date parsing ([#95](https://github.com/opensource-nepal/node-nepali-datetime/issues/95)) ([aeabb8d](https://github.com/opensource-nepal/node-nepali-datetime/commit/aeabb8dde4903114b19010cfee25b0a61a4fc227))
* **ci:** add prettier check on ci ([a728ed4](https://github.com/opensource-nepal/node-nepali-datetime/commit/a728ed48477139eb3417e0e52ead16c23be8e9ff))

## [1.2.1](https://github.com/opensource-nepal/node-nepali-datetime/compare/v1.2.0...v1.2.1) (2024-03-06)


### Bug Fixes

* updated months data for 2081 ([a49b3d6](https://github.com/opensource-nepal/node-nepali-datetime/commit/a49b3d679bcddfdbfc9c5bcf28826ccfedc3a7b9))

## [1.2.0](https://github.com/opensource-nepal/node-nepali-datetime/compare/v1.1.2...v1.2.0) (2023-11-16)


### Features

* reduced package bundle size ([d15e575](https://github.com/opensource-nepal/node-nepali-datetime/commit/d15e5750ffdebce5233b0476e95c3db1cc7311e6))

## [1.1.2](https://github.com/opensource-nepal/node-nepali-datetime/compare/v1.1.1...v1.1.2) (2023-10-03)


### Bug Fixes

* fixed AM/PM formatting issue of noon ([57091bc](https://github.com/opensource-nepal/node-nepali-datetime/commit/57091bc817f275e07627a0388382f7402f44baff))

## 1.1.1

-   Updated NepaliDate members to private.
-   Fixed type resolve issue. (#59, #60)

## 1.1.0 - (August 17, 2023)

-   Added husky for running pre-commit hook.
-   Run npm test on pre-commit hook.
-   Added formatting on pre-commit hook.
-   Refactored formatting.
-   Added parse feature in a given format.

## v1.0.1 - (July 14, 2023)

-   Added dateConverter module.
-   Added time/timezone support in NepaliDate.
-   Updated new formatting methods and added time formatting (with moment.js format reference). Added `formatNepali` method.
-   Supported parse for date and time string on `NepaliDate` constructor.
-   Renamed method `getEnglishDate` to `getDateObject`.
-   Added methods for Nepali year, month, date of English calendar.
-   Added `fromEnglishDate` static method for initializing from English calendar date parameters.
-   Updated `toString` format of NepaliDate.

## v0.1.0 - (May 15, 2023)

-   Initial release with the features included in 'nepali-date'.
-   Typescript support.
