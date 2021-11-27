'use strict';

const {add, getTime} = require(`date-fns`);

const CREATED_DATE_FORMAT = `yyyy-MM-dd HH:mm:ss`;

const OutputRestrict = {
  MIN: 1,
  MAX: 1000
};

const AnnounceRestrict = {
  MIN: 1,
  MAX: 5,
};

const DateDifferenceRestrict = {
  OLDER: getTime(add(new Date(), {months: -3})),
  NEWEST: getTime(new Date())
};

module.exports = {
  CREATED_DATE_FORMAT,
  OutputRestrict,
  AnnounceRestrict,
  DateDifferenceRestrict
};
