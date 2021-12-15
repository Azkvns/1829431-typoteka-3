'use strict';

const fs = require(`fs`).promises;
const {format} = require(`date-fns`);
const {log} = require(`../../utils`);
const {MOCKS_FILE_NAME, INPUT_DATA_FILE_NAMES} = require(`../../constants`);
const {getRandomInt, shuffle, loadFileData} = require(`../utils`);
const {OUTPUT_RESTRICT, ANNOUNCE_RESTRICT, DATE_DIFFERENCE_RESTRICT, CREATED_DATE_FORMAT} = require(`./constants`);

const generateOffers = ({sentences, categories, titles, count}) => {
  return Array(count).fill({}).map(() => {
    return {
      title: titles[getRandomInt(0, titles.length - 1)],
      announce: shuffle(sentences).slice(ANNOUNCE_RESTRICT.MIN, ANNOUNCE_RESTRICT.MAX).join(` `),
      fullText: shuffle(sentences).slice(0, getRandomInt(1, sentences.length - 1)).join(` `),
      createdDate: format(getRandomInt(DATE_DIFFERENCE_RESTRICT.OLDER, DATE_DIFFERENCE_RESTRICT.NEWEST), CREATED_DATE_FORMAT),
      category: shuffle(categories).slice(0, getRandomInt(1, categories.length - 1)),
    };
  });
};

module.exports = {
  name: `--generate`,
  args: [`<count>`],
  description: `формирует файл mocks.json`,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || OUTPUT_RESTRICT.MIN;

    if (countOffer > OUTPUT_RESTRICT.MAX) {
      throw new Error(`Не больше ${OUTPUT_RESTRICT.MAX} объявлений`);
    }

    const data = {
      sentences: await loadFileData(INPUT_DATA_FILE_NAMES.sentences),
      categories: await loadFileData(INPUT_DATA_FILE_NAMES.categories),
      titles: await loadFileData(INPUT_DATA_FILE_NAMES.titles),
    };

    const content = JSON.stringify(generateOffers({...data, count: countOffer}));

    try {
      await fs.writeFile(MOCKS_FILE_NAME, content);
      log.success(`Успешная операция. Файл создан.`);
    } catch (err) {
      throw new Error(`Не получилось записать данные в файл`);
    }
  }
};
