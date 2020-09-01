/* eslint-disable no-console */
/* eslint-disable camelcase */
const pool = require('../../database/database-postgresQL/index.js');

module.exports = {
  getAllReviews: (product_id, callback) => {
    const startTime = Date.now();
    const queryString = `SELECT *, (SELECT array_to_json(array_agg(row_to_json(photos))) FROM (SELECT * FROM photos WHERE reviews.review_id = photos.review_id) photos) AS photos FROM reviews WHERE product_id = ${product_id}`;
    pool.query(queryString, (err, res) => {
      const duration = Date.now() - startTime;
      console.log('executed query: ', duration);
      console.log('error: ', err);
      callback(err, res.rows);
    });
  },
};
