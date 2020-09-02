/* eslint-disable no-console */
/* eslint-disable camelcase */
const fs = require('fs');
const faker = require('faker');

let seedCharacteristics = 'characteristics_id,product_id,name,value,\n';
const start = Date.now();

const generateCharacteristics = () => {
  console.log(`START TIME = ${new Date().toUTCString()}`);

  let char_id = 0;
  for (let product_id = 1; product_id <= 100; product_id += 1) {
    const randomChar = Math.floor(Math.random() * 4) + 1;
    for (let i = 1; i <= randomChar; i += 1) {
      const name = faker.commerce.productAdjective();
      let value = (Math.round(Math.random() * 20) + 1) / 4;
      value = value && value > 5 ? 5 : value;
      value = parseFloat(value).toFixed(4);
      char_id += 1;
      seedCharacteristics = seedCharacteristics.concat(`${char_id},${product_id},${name},${value}\n`);
    }
  }

  fs.writeFile('./characteristics.csv', seedCharacteristics, (err) => {
    if (err) {
      console.log('Error: ', err);
    }
    console.log('Successful data generation!');
  });
};

const endTime = () => {
  const millis = Date.now() - start;
  console.log(`seconds elapsed = ${Math.floor(millis / 1000)}`);
  console.log(`END TIME = ${new Date().toUTCString()}`);
};

generateCharacteristics();
endTime();
