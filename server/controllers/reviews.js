/* eslint-disable camelcase */
/* eslint-disable no-console */
const models = require('../models/reviews.js');

module.exports = {
  getAllReviews: (req, res) => {
    console.log('params: ', req.params);
    console.log('req query: ', req.query);
    // req.query.page = 1;
    // req.query.count = 5;
    // req.query.sort = 'newest';
    // const {
    //   product_id,
    // //   page,
    // //   count,
    // //   sort,
    // } = req.params;

    const resultData = {
      product: req.params.product_id,
      page: parseFloat(req.query.page) || 1,
      count: parseFloat(req.query.count) || 5,
    };

    models.getAllReviews(req.params.product_id, (err, results) => {
      if (err) {
        throw err;
      }
      resultData.result = results;
      res.status(200).json(resultData);
    });
  },
};
