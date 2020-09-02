/* eslint-disable no-console */
/* eslint-disable camelcase */
const pool = require('../../database/database-postgresQL/index.js');

const getChar = (productId, cb, col, table) => {
  const start = Date.now();
  const queryString = `SELECT ${col} FROM ${table} WHERE product_id = ${productId}`;
  pool.query(queryString, (err, res) => {
    const millis = Date.now() - start;
    const duration = Math.floor(millis / 1000);
    if (err) {
      cb(err);
    }
    console.log('executed query: ', { duration, rows: res.rowCount });
    cb(null, res.rows);
  });
};

module.exports = {
  getRatings: (product_id, callback) => {
    getChar(product_id, callback, 'rating', 'reviews');
  },
  getRecommend: (product_id, callback) => {
    getChar(product_id, callback, 'recommend', 'reviews');
  },
  getCharacteristics: (product_id, callback) => {
    getChar(product_id, callback, '*', 'characteristics');
  },
};
