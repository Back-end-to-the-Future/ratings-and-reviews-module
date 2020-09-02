/* eslint-disable no-console */
/* eslint-disable camelcase */
const pool = require('../../database/database-postgresQL/index.js');

module.exports = {
  getAllReviews: (product_id, callback) => {
    const queryString = `SELECT review_id, rating, summary, recommend,
      COALESCE((response), '') AS response, body, date, reviewer_name, reviewer_email, helpfulness, reported,
      COALESCE((SELECT array_to_json(array_agg(row_to_json(photos)))
      FROM (SELECT * FROM photos WHERE reviews.review_id = photos.review_id) photos), '[]')
      AS photos
      FROM reviews
      WHERE product_id = ${product_id}`;
    pool.query(queryString, (err, res) => {
      callback(err, res.rows);
    });
  },
};
