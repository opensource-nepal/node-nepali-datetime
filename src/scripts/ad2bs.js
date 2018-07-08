#!/usr/bin/env node
/* eslint-disable no-console */
const NepaliDate = require('../NepaliDate').default;

const ad = process.argv[2] ? new Date(process.argv[2]) : new Date();
if (Number.isNaN(ad.getTime())) {
  console.log(`Invalid date input '${process.argv[2]}'`);
  process.exit(1);
}
if (ad < NepaliDate.minimum() || ad > NepaliDate.maximum()) {
  console.log(`Date must be within ${NepaliDate.minimum().toDateString()} to ${NepaliDate.maximum().toDateString()}`);
  process.exit(1);
}

const n = new NepaliDate(ad);
console.log(n.toString());
