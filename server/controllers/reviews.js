const models = require('../models/reviews.js');

module.exports = {
  getReviews: (req, res) => {
    console.log('PARAMS: ', req.params);
    models.getAllReviews(req.params.product_id, (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).json(results);
    });
  },
};
