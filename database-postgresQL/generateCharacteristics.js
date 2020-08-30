/* eslint-disable no-console */
/* eslint-disable camelcase */
const fs = require('fs');

let seedCharacteristics = 'review_id,characteristics_id,name,value,\n';

const generateCharacteristics = () => {
  console.log('START DATA GENERATION: ', new Date().toUTCString());

  const fileWriter = () => (
    fs.writeFile('./characteristics.csv', seedCharacteristics, (err) => {
      if (err) {
        throw err;
      }
    })
  );

  const seed = (idx1, idx2, char) => {
    const review_id = idx1;
    const characteristics_id = idx2;
    let value = (Math.round(Math.random() * 20) + 1) / 4;
    value = value && value > 5 ? 5 : value;
    value = parseFloat(value).toFixed(4);
    seedCharacteristics = seedCharacteristics.concat(`${review_id},${characteristics_id},${char},${value}\n`);
  };

  const generateFit = () => {
    for (let i = 1, j = 1; i <= 30 && j <= 30; i += 2, j += 6) {
      seed(i, j, 'Fit');
    }
    fileWriter();
  };

  const generateLength = () => {
    for (let i = 1, j = 2; i <= 30 && j <= 30; i += 2, j += 6) {
      seed(i, j, 'Length');
    }
    fileWriter();
  };

  const generateComfort = () => {
    for (let i = 1, j = 3; i <= 30 && j <= 30; i += 2, j += 6) {
      seed(i, j, 'Comfort');
    }
    fileWriter();
  };

  const generateQuality = () => {
    for (let i = 1, j = 4; i <= 30 && j <= 30; i += 1, j += 6) {
      seed(i, j, 'Quality');
    }
    fileWriter();
  };

  const generateSize = () => {
    for (let i = 2, j = 5; i <= 30 && j <= 30; i += 2, j += 6) {
      seed(i, j, 'Size');
    }
    fileWriter();
  };

  const generateWidth = () => {
    for (let i = 2, j = 6; i <= 30 && j <= 30; i += 2, j += 6) {
      seed(i, j, 'Width');
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
