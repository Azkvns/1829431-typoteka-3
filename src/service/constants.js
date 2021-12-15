'use strict';

const EXIT_CODES = {
  success: 0,
  failed: 1
};

const DEFAULT_USER_COMMAND = `--help`;

const INPUT_DATA_FILE_NAMES = {
  titles: `./data/titles.txt`,
  sentences: `./data/sentences.txt`,
  categories: `./data/categories.txt`
};

const MOCKS_FILE_NAME = `mocks.json`;

module.exports = {
  EXIT_CODES,
  DEFAULT_USER_COMMAND,
  MOCKS_FILE_NAME,
  INPUT_DATA_FILE_NAMES
};
