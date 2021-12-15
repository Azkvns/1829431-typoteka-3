'use strict';

const fs = require(`fs`).promises;
const http = require(`http`);
const {log} = require(`../../utils`);

const {DEFAULT_SERVER_PORT, STATUS_CODES} = require(`./constants`);
const {MOCKS_FILE_NAME} = require(`../../constants`);

const sendResponse = (res, statusCode, message) => {
  const template = `
    <!Doctype html>
    <html lang="ru">
    <head>
      <title>Типотека</title>
    </head>
    <body>${message}</body>
  </html>`.trim();

  res.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF-8`,
  });

  res.end(template);
};

const onClientConnect = async (req, res) => {
  const notFoundMessageText = `Not found`;

  switch (req.url) {
    case `/`:
      try {
        const fileContent = await fs.readFile(MOCKS_FILE_NAME);
        const mocks = JSON.parse(fileContent);
        const message = mocks.map((post) => `<li>${post.title}</li>`).join(``);
        sendResponse(res, STATUS_CODES.OK, `<ul>${message}</$ul>`);
      } catch (err) {
        sendResponse(res, STATUS_CODES.NOT_FOUND, notFoundMessageText);
      }
      break;
    default:
      sendResponse(res, STATUS_CODES.NOT_FOUND, notFoundMessageText);
  }
};

module.exports = {
  name: `--server`,
  args: [`<port>`],
  description: `Запускает сервер на указанном порту (по умолчанию 3000)`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_SERVER_PORT;

    http.createServer(onClientConnect)
        .listen(port)
        .on(`listening`, () => {
          console.info(log.success(`Ожидаю соединений на ${port}`));
        })
        .on(`error`, ({message}) => {
          throw new Error(`Ошибка при создании сервера: ${message}`);
        });
  }
};
