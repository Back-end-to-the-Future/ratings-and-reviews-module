/* eslint-disable no-console */
/* eslint-disable camelcase */
const fs = require('fs');

let seedCharacteristics = 'review_id,characteristics_id,value,\n';
// let seedCharNames = 'name,\n';

const generateCharacteristics = () => {
  console.log('START DATA GENERATION: ', new Date().toUTCString());

  const fileWriter = () => (
    fs.writeFile('./characteristics.csv', seedCharacteristics, (err) => {
      if (err) {
        throw err;
      }
    })
  );

  // const fileWriterNames = () => (
  //   fs.writeFile('./char-names.csv', seedCharNames, (err) => {
  //     if (err) {
  //       throw err;
  //     }
  //   })
  // );

  // const seed = (idx1, idx2, char) => {
  const seed = (idx1, idx2) => {
    const review_id = idx1;
    const characteristics_id = idx2;
    let value = (Math.round(Math.random() * 20) + 1) / 4;
    value = value && value > 5 ? 5 : value;
    value = parseFloat(value).toFixed(4);
    seedCharacteristics = seedCharacteristics.concat(`${review_id},${characteristics_id},${value}\n`);
    // seedCharNames = seedCharNames.concat(`${char}\n`);
    console.log('value: ', typeof value);
  };

  const generateFit = () => {
    for (let i = 1, j = 1; i <= 300 && j <= 300; i += 2, j += 6) {
      seed(i, j, 'Fit');
    }
    fileWriter();
    // fileWriterNames();
  };

  const generateLength = () => {
    for (let i = 1, j = 2; i <= 300 && j <= 300; i += 2, j += 6) {
      seed(i, j, 'Length');
    }
    fileWriter();
    // fileWriterNames();
  };

  const generateComfort = () => {
    for (let i = 1, j = 3; i <= 300 && j <= 300; i += 2, j += 6) {
      seed(i, j, 'Comfort');
    }
    fileWriter();
    // fileWriterNames();
  };

  const generateQuality = () => {
    for (let i = 1, j = 4; i <= 300 && j <= 300; i += 2, j += 6) {
      seed(i, j, 'Quality');
    }
    fileWriter();
    // fileWriterNames();
  };

  const generateSize = () => {
    for (let i = 2, j = 5; i <= 300 && j <= 300; i += 2, j += 6) {
      seed(i, j, 'Size');
    }
    fileWriter();
    // fileWriterNames();
  };

  const generateWidth = () => {
    for (let i = 2, j = 6; i <= 300 && j <= 300; i += 2, j += 6) {
      seed(i, j, 'Width');
    }
    fileWriter();
    // fileWriterNames();
  };

  generateFit();
  generateLength();
  generateComfort();
  generateQuality();
  generateSize();
  generateWidth();
};

generateCharacteristics();
