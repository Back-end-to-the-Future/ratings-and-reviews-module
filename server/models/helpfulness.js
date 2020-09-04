/* eslint-disable no-console */
/* eslint-disable camelcase */
const pool = require('../../database/database-postgresQL/index.js');

module.exports = {
  updateHelpfulness: (review_id, callback) => {
    const start = Date.now();
    const queryString = `UPDATE reviews SET helpfulness = helpfulness + 1 WHERE review_id = '${review_id}' RETURNING helpfulness`;
    pool.query(queryString, (err, res) => {
      const millis = Date.now() - start;
      const duration = Math.floor(millis / 1000);
      if (err) {
        callback(err);
      }
      console.log('executed query: ', { duration, rows: res.rowCount });
      callback(null, res.rows[0].helpfulness);
    });
  },
};
