'use strict';

const ExitCode = {
  success: 0,
  failed: 1
};

const DEFAULT_USER_COMMAND = `--help`;

const InputDataFileNames = {
  titles: `./data/titles.txt`,
  sentences: `./data/sentences.txt`,
  categories: `./data/categories.txt`
};

const OUTPUT_FILE_NAME = `mocks.json`;

module.exports = {
  ExitCode,
  DEFAULT_USER_COMMAND,
  OUTPUT_FILE_NAME,
  InputDataFileNames
};
