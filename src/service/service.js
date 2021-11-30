'use strict';

const {Cli, availableCommands} = require(`./cli`);
const {EXIT_CODES, DEFAULT_USER_COMMAND} = require(`./constants`);
const {log} = require(`./utils`);

const USER_ARGV_INDEX = 2;

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [requestedCommand] = userArguments;
const command = availableCommands.includes(requestedCommand) ? requestedCommand : DEFAULT_USER_COMMAND;

const commandArguments = userArguments.slice(1);

const runService = async () => {
  try {
    await Cli[command].run(commandArguments);
  } catch (err) {
    log.error(err.message);
    process.exit(EXIT_CODES.failed);
  }
};

runService();

