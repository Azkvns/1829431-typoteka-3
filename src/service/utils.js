'use strict';

const chalk = require(`chalk`);

const log = {
  success: (msg) => {
    console.log(chalk.green(msg));
  },
  error: (msg) => {
    console.error(chalk.red(msg));
  },
  info: (msg) => {
    console.info(chalk.grey(msg));
  },
  blue: (msg) => {
    console.log(chalk.blue(msg));
  }
};

module.exports = {
  log,
};
