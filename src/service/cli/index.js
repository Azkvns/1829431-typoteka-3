'use strict';

const {getRootFileName} = require(`./utils`);

const version = require(`./version`);
const help = require(`./help`);
const generate = require(`./generator`);
const server = require(`./server`);

const modules = [version, help, generate, server];
const availableCommands = modules.map((command) => command.name);

help.configure(modules, getRootFileName());

const Cli = {};

modules.forEach((module) => {
  Cli[module.name] = module;
});

module.exports = {
  Cli,
  availableCommands
};
