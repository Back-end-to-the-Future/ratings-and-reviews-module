const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const dummyData = require('./dummyData.js');

// const prefix = '/rrmodule';

const port = 3000;
// const url = 'http://52.26.193.201:3000';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/rrmodule', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../public/bundle.js`));
});

app.get('/rrmodule/reviews/:product_id/list', (req, res) => {
  // let {page} = req.query;
  // let {count} = req.query;
  console.log('query: ', req.query);

  res.status(200).send(dummyData.listReviews);
});

app.get('/rrmodule/reviews/:product_id/meta', (req, res) => {
  res.status(200).send(dummyData.reviewMetadata);
});

app.post('/rrmodule/reviews/:product_id', (req, res) => {
  res.status(201).send(dummyData.addReview);
});

app.put('/rrmodule/reviews/helpful/:review_id', (req, res) => {
  res.status(204).send(dummyData.markHelpfulReview);
});

app.put('/rrmodule/reviews/report/:review_id', (req, res) => {
  res.status(204).send(dummyData.reportReview);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`The server is listening on port ${port}`);
});
