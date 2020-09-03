/* eslint-disable no-console */
/* eslint-disable camelcase */
const faker = require('faker');
const fs = require('fs');

const start = Date.now();
const writePhotos = fs.createWriteStream('photos.csv');
writePhotos.write('review_id,url,\n', 'utf-8');

const writeFiveMillionPhotos = (writer, encoding, callback) => {
  console.log(`START TIME = ${new Date().toUTCString()}`);
  let i = 5000000;
  const write = () => {
    let ok = true;
    do {
      i -= 1;
      const review_id = Math.floor(Math.random() * 10000000) + 1;
      const url = faker.image.imageUrl();
      const photos = `${review_id},${url}\n`;
      if (i === 0) {
        writer.write(photos, encoding, callback);
      } else {
        ok = writer.write(photos, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  };
  write();
};

writeFiveMillionPhotos(writePhotos, 'utf-8', () => {
  writePhotos.end();
  const millis = Date.now() - start;
  console.log(`seconds elapsed = ${Math.floor(millis / 1000)}`);
  console.log(`END TIME = ${new Date().toUTCString()}`);
});
