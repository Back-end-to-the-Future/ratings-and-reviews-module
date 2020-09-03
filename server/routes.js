/* eslint-disable no-console */
const express = require('express');
const axios = require('axios');

const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const reviews = require('./controllers/reviews.js');
const metadata = require('./controllers/metadata.js');

// const prefix = '/rrmodule';

const port = 3000;
const url = 'http://52.26.193.201:3000';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/rrmodule', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../public/bundle.js`));
});

app.get('/rrmodule/reviews/:product_id/list', reviews.getAllReviews);
app.get('/rrmodule/reviews/:product_id/meta', metadata.getMetadata);

// app.post('/rrmodule/reviews/:product_id', (req, res) => {
//   res.status(201).send(dummyData.addReview);
// });

// app.put('/rrmodule/reviews/helpful/:review_id', (req, res) => {
//   res.status(204).send(dummyData.markHelpfulReview);
// });

// app.put('/rrmodule/reviews/report/:review_id', (req, res) => {
//   res.status(204).send(dummyData.reportReview);
// });

// OLD ROUTES

app.put('/rrmodule/reviews/helpful/:review_id', (req, res) => {
  axios.put(`${url}/reviews/helpful/${req.params.review_id}`)
    .then(() => {
      res.send();
    })
    .catch((error) => {
      res.send('Error has occured: ', error);
    });
});

app.listen(port, () => {
  console.log(`The server is listening on port ${port}`);
});
