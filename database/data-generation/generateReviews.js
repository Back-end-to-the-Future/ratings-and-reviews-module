/* eslint-disable no-console */
/* eslint-disable camelcase */
const faker = require('faker');
const fs = require('fs');

let seedReviews = 'id_product,rating,summary,recommend,response,body,date,reviewer_name,reviewer_email,helpfulness,reported,\n';

console.log('date: ', faker.date.past(5));

const generateReviews = () => {
  console.log('START DATA GENERATION: ', new Date().toUTCString());
  for (let i = 0; i < 100; i += 1) {
    const boolean = Math.floor(Math.random() * 2);
    const id_product = Math.floor(Math.random() * 10) + 1;
    const rating = Math.floor(Math.random() * 5) + 1;
    const summary = faker.lorem.sentence(3);
    const recommend = (boolean === 1 ? 'yes' : 'no');
    const response = (boolean === 1 ? faker.lorem.sentence(5) : '');
    const bodyLength = Math.floor(Math.random() * 6) + 3;
    const body = faker.lorem.sentences(bodyLength);
    let date = faker.date.past(5);
    date = date.toString().slice(0, -33).concat('MDT');
    const reviewer_name = faker.internet.userName();
    const reviewer_email = faker.internet.email();
    const helpfulness = Math.floor(Math.random() * 30);
    seedReviews = seedReviews.concat(
      `${id_product},${rating},${summary},${recommend},${response},${body},${date},${reviewer_name},${reviewer_email},${helpfulness},false\n`,
    );
  }

  fs.writeFile('./reviews.csv', seedReviews, (err) => {
    if (err) {
      throw err;
    }
  });
};

generateReviews();
