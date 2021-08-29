'use strict';

const {getLineWithIndentFromStart} = require(`./utils`);

const INDENT_TO_DESCRIPTION = 22;

const makeHelpText = (modules = [], mainFile = `index.js`) => {
  const template = `Программа запускает http-сервер и формирует файл с данными для API.

  Гайд:
  ${mainFile} <command>

  Команды:\n`;

  const commands = modules.map((module) => {
    const {name, args = [], description} = module;
    const commandLine = args.length ? `${name} ${args.join(` `)}` : name + `:`;
    const lineWithIndent = getLineWithIndentFromStart(commandLine, INDENT_TO_DESCRIPTION);
    return `    ` + lineWithIndent + description;
  });

  return template + commands.join(`\n`);
};

module.exports = {
  name: `--help`,
  description: `печатает этот текст`,
  modules: [],
  rootFile: `index.js`,
  configure(modules, rootFile = this.rootFile) {
    this.modules = modules;
    this.rootFile = rootFile;
  },
  run() {
    console.info(makeHelpText(this.modules, this.rootFile));
  }
};
