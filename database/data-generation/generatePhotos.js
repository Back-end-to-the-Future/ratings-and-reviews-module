/* eslint-disable no-console */
/* eslint-disable camelcase */
const faker = require('faker');
const fs = require('fs');

let seedPhotos = 'review_id,url,\n';

const generatePhotos = () => {
  console.log('START DATA GENERATION: ', new Date().toUTCString());
  for (let i = 0; i < 50; i += 1) {
    const review_id = Math.floor(Math.random() * 100) + 1;
    const url = faker.image.imageUrl();
    seedPhotos = seedPhotos.concat(`${review_id},${url}\n`);
  }

  fs.writeFile('./photos.csv', seedPhotos, (err) => {
    if (err) {
      throw err;
    }
  });
};

generatePhotos();
