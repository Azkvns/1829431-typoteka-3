'use strict';

const packageFile = require(`../../../package.json`);
const {log} = require(`../utils`);

module.exports = {
  name: `--version`,
  description: `выводит номер версии`,
  run() {
    const version = packageFile.version;
    log.blue(version);
  }
};
