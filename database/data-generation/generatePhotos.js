/* eslint-disable no-console */
/* eslint-disable camelcase */
const faker = require('faker');
const fs = require('fs');

let seedPhotos = 'review_id,url,\n';
const start = Date.now();

const generatePhotos = () => {
  console.log(`START TIME = ${new Date().toUTCString()}`);

  for (let i = 0; i < 500000; i += 1) {
    const review_id = Math.floor(Math.random() * 1000000) + 1;
    const url = faker.image.imageUrl();
    seedPhotos = seedPhotos.concat(`${review_id},${url}\n`);
  }

  fs.writeFile('./photos.csv', seedPhotos, (err) => {
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

generatePhotos();
endTime();
