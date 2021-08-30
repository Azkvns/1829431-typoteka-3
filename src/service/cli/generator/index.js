'use strict';

const fs = require(`fs`);
const {getRandomInt, shuffle} = require(`../utils`);
const {format} = require(`date-fns`);
const {CATEGORIES, ANNOUNCES, TITLES, FILE_NAME, OutputRestrict, AnnounceRestrict, DateDifferenceRestrict, CREATED_DATE_FORMAT} = require(`./constants`);

const generateOffers = (count) => {
  return Array(count).fill({}).map(() => {
    return {
      title: TITLES[getRandomInt(0, TITLES.length - 1)],
      announce: shuffle(ANNOUNCES).slice(AnnounceRestrict.MIN, AnnounceRestrict.MAX).join(` `),
      fullText: shuffle(ANNOUNCES).slice(0, getRandomInt(1, ANNOUNCES.length - 1)).join(` `),
      createdDate: format(getRandomInt(DateDifferenceRestrict.OLDER, DateDifferenceRestrict.NEWEST), CREATED_DATE_FORMAT),
      category: shuffle(CATEGORIES).slice(0, getRandomInt(1, CATEGORIES.length - 1)),
    };
  });
};

module.exports = {
  name: `--generate`,
  args: [`<count>`],
  description: `формирует файл mocks.json`,
  run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || OutputRestrict.MIN;

    if (countOffer > OutputRestrict.MAX) {
      throw new Error(`Не больше ${OutputRestrict.MAX} объявлений`);
    }

    const content = JSON.stringify(generateOffers(countOffer));

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        throw new Error(`Не получилось записать данные в файл`);
      }

      return console.info(`Успешная операция. Файл создан.`);
    });

  }
};
