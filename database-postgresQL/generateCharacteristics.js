/* eslint-disable no-console */
/* eslint-disable camelcase */
const fs = require('fs');

let seedCharacteristics = 'reviews_id,characteristics_id,value,\n';

const generateCharacteristics = () => {
  console.log('START DATA GENERATION: ', new Date().toUTCString());

  const fileWriter = () => (
    fs.writeFile('./characteristics.csv', seedCharacteristics, (err) => {
      if (err) {
        throw err;
      }
    })
  );

  const generateFit = () => {
    for (let i = 0; i < 10; i += 1) {
      const reviews_id = Math.floor(Math.random() * 6) + 1;
      const value = Math.floor(Math.random() * 5) + 1;
      seedCharacteristics = seedCharacteristics.concat(`${reviews_id},${1},${value}\n`);
    }
    fileWriter();
  };

  const generateLength = () => {
    for (let i = 0; i < 10; i += 1) {
      const reviews_id = Math.floor(Math.random() * 6) + 1;
      const value = Math.floor(Math.random() * 5) + 1;
      seedCharacteristics = seedCharacteristics.concat(`${reviews_id},${2},${value}\n`);
    }
    fileWriter();
  };

  const generateComfort = () => {
    for (let i = 0; i < 10; i += 1) {
      const reviews_id = Math.floor(Math.random() * 6) + 1;
      const value = Math.floor(Math.random() * 5) + 1;
      seedCharacteristics = seedCharacteristics.concat(`${reviews_id},${3},${value}\n`);
    }
    fileWriter();
  };

  // most prevalent
  const generateQuality = () => {
    for (let i = 0; i < 10; i += 1) {
      const reviews_id = i;
      const value = Math.floor(Math.random() * 5) + 1;
      seedCharacteristics = seedCharacteristics.concat(`${reviews_id},${4},${value}\n`);
    }
    fileWriter();
  };

  const generateSize = () => {
    for (let i = 0; i < 10; i += 1) {
      const reviews_id = Math.floor(Math.random() * 4) + 1;
      const value = Math.floor(Math.random() * 5) + 1;
      seedCharacteristics = seedCharacteristics.concat(`${reviews_id},${5},${value}\n`);
    }
    fileWriter();
  };

  const generateWidth = () => {
    for (let i = 0; i < 10; i += 1) {
      const reviews_id = Math.floor(Math.random() * 4) + 1;
      const value = Math.floor(Math.random() * 5) + 1;
      seedCharacteristics = seedCharacteristics.concat(`${reviews_id},${6},${value}\n`);
    }
    fileWriter();
  };

  generateFit();
  generateLength();
  generateComfort();
  generateQuality();
  generateSize();
  generateWidth();
};

generateCharacteristics();
