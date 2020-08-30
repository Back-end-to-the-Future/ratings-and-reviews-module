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

  const generateFit = () => {
    for (let i = 0, j = 0; i < 10 && j < 10; i += 1, j += 2) {
      const review_id = j + 1;
      let value = (Math.round(Math.random() * 20) + 1) / 4;
      value = value && value > 5 ? 5 : value;
      seedCharacteristics = seedCharacteristics.concat(`${review_id},${1},Fit,${parseFloat(value).toFixed(4)}\n`);
    }
    fileWriter();
  };

  const generateLength = () => {
    for (let i = 0, j = 0; i < 10 && j < 10; i += 1, j += 3) {
      const review_id = j + 1;
      let value = (Math.round(Math.random() * 20) + 1) / 4;
      value = value && value > 5 ? 5 : value;
      seedCharacteristics = seedCharacteristics.concat(`${review_id},${2},Length,${parseFloat(value).toFixed(4)}\n`);
    }
    fileWriter();
  };

  const generateComfort = () => {
    for (let i = 0, j = 0; i < 10 && j < 10; i += 1, j += 3) {
      const review_id = j + 1;
      let value = (Math.round(Math.random() * 20) + 1) / 4;
      value = value && value > 5 ? 5 : value;
      seedCharacteristics = seedCharacteristics.concat(`${review_id},${3},Comfort,${parseFloat(value).toFixed(4)}\n`);
    }
    fileWriter();
  };

  const generateQuality = () => {
    for (let i = 0; i < 10; i += 1) {
      const review_id = i + 1;
      let value = (Math.round(Math.random() * 20) + 1) / 4;
      value = value && value > 5 ? 5 : value;
      seedCharacteristics = seedCharacteristics.concat(`${review_id},${4},Quality,${parseFloat(value).toFixed(4)}\n`);
    }
    fileWriter();
  };

  const generateSize = () => {
    for (let i = 0, j = 0; i < 10 && j < 10; i += 1, j += 5) {
      const review_id = j + 1;
      let value = (Math.round(Math.random() * 20) + 1) / 4;
      value = value && value > 5 ? 5 : value;
      seedCharacteristics = seedCharacteristics.concat(`${review_id},${5},Size,${parseFloat(value).toFixed(4)}\n`);
    }
    fileWriter();
  };

  const generateWidth = () => {
    for (let i = 0, j = 0; i < 10 && j < 10; i += 1, j += 5) {
      const review_id = j + 1;
      let value = (Math.round(Math.random() * 20) + 1) / 4;
      value = value && value > 5 ? 5 : value;
      seedCharacteristics = seedCharacteristics.concat(`${review_id},${6},Width,${parseFloat(value).toFixed(4)}\n`);
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
