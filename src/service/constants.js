'use strict';

const EXIT_CODE = {
  success: 0,
  failed: 1
};

const DEFAULT_USER_COMMAND = `--help`;

const INPUT_DATA_FILE_NAMES = {
  titles: `./data/titles.txt`,
  sentences: `./data/sentences.txt`,
  categories: `./data/categories.txt`
};

const OUTPUT_FILE_NAME = `mocks.json`;

module.exports = {
  EXIT_CODE,
  DEFAULT_USER_COMMAND,
  OUTPUT_FILE_NAME,
  INPUT_DATA_FILE_NAMES
};
