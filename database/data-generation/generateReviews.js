/* eslint-disable no-console */
/* eslint-disable camelcase */
const faker = require('faker');
const fs = require('fs');

const start = Date.now();
const writeReviews = fs.createWriteStream('reviews.csv');
writeReviews.write('product_id,rating,summary,recommend,response,body,date,reviewer_name,reviewer_email,helpfulness,reported\n', 'utf-8');

const writeTenMillionReviews = (writer, encoding, callback) => {
  console.log(`START TIME = ${new Date().toUTCString()}`);
  let i = 10000000;
  const write = () => {
    let ok = true;
    do {
      i -= 1;
      const boolean = Math.floor(Math.random() * 2);
      const product_id = Math.floor(Math.random() * 1000000) + 1;
      const rating = Math.floor(Math.random() * 5) + 1;
      const summary = faker.lorem.sentence(3);
      const recommend = boolean;
      const response = (boolean === 1 ? faker.lorem.sentence(5) : '');
      const body = faker.lorem.sentences(Math.floor(Math.random() * 6) + 3);
      let date = faker.date.past(5);
      date = date.toString().slice(0, -33).concat('MDT');
      const reviewer_name = faker.internet.userName();
      const reviewer_email = faker.internet.email();
      const helpfulness = Math.floor(Math.random() * 30);
      const review = `${product_id},${rating},${summary},${recommend},${response},${body},${date},${reviewer_name},${reviewer_email},${helpfulness},false\n`;
      if (i === 0) {
        writer.write(review, encoding, callback);
      } else {
        ok = writer.write(review, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  };
  write();
};

writeTenMillionReviews(writeReviews, 'utf-8', () => {
  writeReviews.end();
  const millis = Date.now() - start;
  console.log(`seconds elapsed = ${Math.floor(millis / 1000)}`);
  console.log(`END TIME = ${new Date().toUTCString()}`);
});
