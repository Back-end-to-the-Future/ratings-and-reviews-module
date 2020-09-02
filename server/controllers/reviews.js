/* eslint-disable camelcase */
/* eslint-disable no-console */
const models = require('../models/reviews.js');

module.exports = {
  getAllReviews: (req, res) => {
    const resultData = {
      product: req.params.product_id,
      page: parseFloat(req.query.page) || 1,
      count: parseFloat(req.query.count) || 5,
    };

    models.getAllReviews(req.params.product_id, (err, results) => {
      if (err) {
        console.log(err);
      }
      resultData.results = results;
      res.status(200).json(resultData);
    });
  },
};
