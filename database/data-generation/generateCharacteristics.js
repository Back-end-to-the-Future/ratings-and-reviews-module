/* eslint-disable no-console */
/* eslint-disable camelcase */
const fs = require('fs');
const faker = require('faker');

let seedCharacteristics = 'characteristics_id,review_id,name,value,\n';

const generateCharacteristics = () => {
  console.log('START DATA GENERATION: ', new Date().toUTCString());

  let char_id = 0;
  for (let review_id = 1; review_id <= 100; review_id += 1) {
    const randomChar = Math.floor(Math.random() * 4) + 1;
    for (let i = 1; i <= randomChar; i += 1) {
      const name = faker.commerce.productAdjective();
      let value = (Math.round(Math.random() * 20) + 1) / 4;
      value = value && value > 5 ? 5 : value;
      value = parseFloat(value).toFixed(4);
      char_id += 1;
      seedCharacteristics = seedCharacteristics.concat(`${char_id},${review_id},${name},${value}\n`);
    }
  }

  fs.writeFile('./characteristics.csv', seedCharacteristics, (err) => {
    if (err) {
      throw err;
    }
  });
};

generateCharacteristics();
