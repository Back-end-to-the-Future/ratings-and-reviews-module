/* eslint-disable no-console */
/* eslint-disable camelcase */
const faker = require('faker');
const fs = require('fs');

let seedReviews = ;
const start = Date.now();

const writeReviews = fs.createWriteStream('reviews.scv');
writeReviews.write('id_product,rating,summary,recommend,response,body,date,reviewer_name,reviewer_email,helpfulness,reported,\n', 'utf-8')

const generateReviews = (writer, encoding, callback) => {
  console.log(`START TIME = ${new Date().toUTCString()}`);

    const boolean = Math.floor(Math.random() * 2);
    const id_product = Math.floor(Math.random() * 10) + 1;
    const rating = Math.floor(Math.random() * 5) + 1;
    const summary = faker.random.words(Math.floor(Math.random() * 10) + 5);
    const recommend = boolean;
    const response = (boolean === 1 ? faker.random.words(Math.floor(Math.random() * 25) + 5) : '');
    const body = faker.random.words(Math.floor(Math.random() * 40) + 10);
    let date = faker.date.past(5);
    date = date.toString().slice(0, -33).concat('MDT');
    const reviewer_name = faker.internet.userName();
    const reviewer_email = faker.internet.email();
    const helpfulness = Math.floor(Math.random() * 30);
    return `${id_product},${rating},${summary},${recommend},${response},${body},${date},${reviewer_name},${reviewer_email},${helpfulness},false\n`;

  fs.writeFile('./reviews.csv', seedReviews, (err) => {
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

generateReviews();
endTime();
