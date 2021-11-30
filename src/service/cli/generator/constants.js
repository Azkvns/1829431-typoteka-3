'use strict';

const {add, getTime} = require(`date-fns`);

const CREATED_DATE_FORMAT = `yyyy-MM-dd HH:mm:ss`;

const OUTPUT_RESTRICT = {
  MIN: 1,
  MAX: 1000
};

const ANNOUNCE_RESTRICT = {
  MIN: 1,
  MAX: 5,
};

const DATE_DIFFERENCE_RESTRICT = {
  OLDER: getTime(add(new Date(), {months: -3})),
  NEWEST: getTime(new Date())
};

module.exports = {
  CREATED_DATE_FORMAT,
  OUTPUT_RESTRICT,
  ANNOUNCE_RESTRICT,
  DATE_DIFFERENCE_RESTRICT
};
