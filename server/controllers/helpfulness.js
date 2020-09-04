/* eslint-disable camelcase */
/* eslint-disable no-console */
const models = require('../models/helpfulness.js');

module.exports = {
  updateHelpfulness: (req, res) => {
    const { review_id } = req.params;
    models.updateHelpfulness(review_id, (err) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(204).end();
    });
  },
};
