/* eslint-disable no-console */
/* eslint-disable camelcase */
const faker = require('faker');
const fs = require('fs');

let seedPhotos = 'reviews_id,url,\n';

const generatePhotos = () => {
  for (let i = 0; i < 5000000; i += 1) {
    const reviews_id = Math.floor(Math.random() * 10000000) + 1;
    const url = faker.image.imageUrl();
    seedPhotos = seedPhotos.concat(`${reviews_id},${url}\n`);
  }

  fs.writeFile('./photos.csv', seedPhotos, (err) => {
    if (err) {
      throw err;
    }
  });
};

generatePhotos();
