'use strict';

const fs = require(`fs`).promises;
const {format} = require(`date-fns`);
const {log} = require(`../../utils`);
const {OUTPUT_FILE_NAME, InputDataFileNames} = require(`../../constants`);
const {getRandomInt, shuffle, loadFileData} = require(`../utils`);
const {OutputRestrict, AnnounceRestrict, DateDifferenceRestrict, CREATED_DATE_FORMAT} = require(`./constants`);

const generateOffers = ({sentences, categories, titles, count}) => {
  return Array(count).fill({}).map(() => {
    return {
      title: titles[getRandomInt(0, titles.length - 1)],
      announce: shuffle(sentences).slice(AnnounceRestrict.MIN, AnnounceRestrict.MAX).join(` `),
      fullText: shuffle(sentences).slice(0, getRandomInt(1, sentences.length - 1)).join(` `),
      createdDate: format(getRandomInt(DateDifferenceRestrict.OLDER, DateDifferenceRestrict.NEWEST), CREATED_DATE_FORMAT),
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
    const countOffer = Number.parseInt(count, 10) || OutputRestrict.MIN;

    if (countOffer > OutputRestrict.MAX) {
      throw new Error(`Не больше ${OutputRestrict.MAX} объявлений`);
    }

    const data = {
      sentences: await loadFileData(InputDataFileNames.sentences),
      categories: await loadFileData(InputDataFileNames.categories),
      titles: await loadFileData(InputDataFileNames.titles),
    };

    const content = JSON.stringify(generateOffers({...data, count: countOffer}));

    try {
      await fs.writeFile(OUTPUT_FILE_NAME, content);
      log.success(`Успешная операция. Файл создан.`);
    } catch (err) {
      throw new Error(`Не получилось записать данные в файл`);
    }
  }
};
