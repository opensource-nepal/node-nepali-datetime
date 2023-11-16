# CHANGELOG

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
