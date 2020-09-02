/* eslint-disable no-console */
/* eslint-disable camelcase */
const pool = require('../../database/database-postgresQL/index.js');

module.exports = {
  getRatings: (product_id, callback) => {
    const start = Date.now();
    const queryString = `SELECT rating FROM reviews WHERE product_id = ${product_id}`;
    pool.query(queryString, (err, res) => {
      const millis = Date.now() - start;
      const duration = Math.floor(millis / 1000);
      if (err) {
        callback(err);
      }
      console.log('executed query: ', { duration, rows: res.rowCount });
      callback(null, res.rows);
    });
  },
  getRecommend: (product_id, callback) => {
    const start = Date.now();
    const queryString = `SELECT recommend FROM reviews WHERE product_id = ${product_id}`;
    pool.query(queryString, (err, res) => {
      const millis = Date.now() - start;
      const duration = Math.floor(millis / 1000);
      if (err) {
        callback(err);
      }
      console.log('executed query: ', { duration, rows: res.rowCount });
      callback(null, res.rows);
    });
  },
  getCharacteristics: (product_id, callback) => {
    const start = Date.now();
    const queryString = `SELECT * FROM characteristics WHERE product_id = ${product_id}`;
    pool.query(queryString, (err, res) => {
      const millis = Date.now() - start;
      const duration = Math.floor(millis / 1000);
      if (err) {
        callback(err);
      }
      console.log('executed query: ', { duration, rows: res.rowCount });
      callback(null, res.rows);
    });
  },
};
