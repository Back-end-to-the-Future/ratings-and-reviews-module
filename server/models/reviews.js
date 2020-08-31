/* eslint-disable camelcase */
const db = require('../../database/database-postgresQL/index.js');

module.exports = {
  getAllReviews: (product_id, callback) => {
    const queryString = `SELECT * FROM public.reviews WHERE product_id = ${product_id}`;
    db.query(queryString, (err, results) => {
      callback(err, results);
    });
  },
};
