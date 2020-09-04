const router = require('express').Router();
const path = require('path');

const reviews = require('./controllers/reviews.js');
const metadata = require('./controllers/metadata.js');
const helpfulness = require('./controllers/helpfulness.js');

router.get('/rrmodule', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../public/bundle.js`));
});

router.get('/:product_id/list', reviews.getAllReviews);
router.get('/:product_id/meta', metadata.getMetadata);
router.put('/helpful/:review_id', helpfulness.updateHelpfulness);

// router.post('/rrmodule/reviews/:product_id', (req, res) => {
//   res.status(201).send(dummyData.addReview);
// });

// router.put('/rrmodule/reviews/report/:review_id', (req, res) => {
//   res.status(204).send(dummyData.reportReview);
// });

module.exports = router;
