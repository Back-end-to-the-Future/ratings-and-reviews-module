/* eslint-disable no-console */
/* eslint-disable camelcase */
const faker = require('faker');
const fs = require('fs');

const start = Date.now();
const writeCharacteristics = fs.createWriteStream('characteristics.csv');
writeCharacteristics.write('characteristics_id,product_id,name,value\n', 'utf-8');

const writeTenMillionCharacteristics = (writer, encoding, callback) => {
  console.log(`START TIME = ${new Date().toUTCString()}`);
  let i = 1000000;
  let char_id = 0;
  let product_id = 0;
  const write = () => {
    let ok = true;
    do {
      i -= 1;
      let characteristics = '';
      if (product_id !== 1000000) {
        product_id += 1;
        const randomChar = Math.floor(Math.random() * 4) + 1;
        for (let j = 1; j <= randomChar; j += 1) {
          const name = faker.commerce.productAdjective();
          let value = (Math.round(Math.random() * 20) + 1) / 4;
          value = value && value > 5 ? 5 : value;
          value = parseFloat(value).toFixed(4);
          char_id += 1;
          characteristics = characteristics.concat(`${char_id},${product_id},${name},${value}\n`);
        }
      }
      if (i === 0) {
        writer.write(characteristics, encoding, callback);
      } else {
        ok = writer.write(characteristics, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  };
  write();
};

writeTenMillionCharacteristics(writeCharacteristics, 'utf-8', () => {
  writeCharacteristics.end();
  const millis = Date.now() - start;
  console.log(`seconds elapsed = ${Math.floor(millis / 1000)}`);
  console.log(`END TIME = ${new Date().toUTCString()}`);
});
