/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
/* eslint-disable no-console */
const models = require('../models/metadata.js');

const accessRatings = (ratings) => {
  const ratingsData = {};
  ratings.forEach((rating) => {
    const currentRating = rating.rating;
    ratingsData[currentRating] === undefined
      ? (ratingsData[currentRating] = 1)
      : (ratingsData[currentRating] += 1);
  });
  return ratingsData;
};

const accessRecommends = (recommended) => {
  const recommendedData = {};
  recommended.forEach((recommend) => {
    const currentRecommend = recommend.recommend;
    recommendedData[currentRecommend] === undefined
      ? (recommendedData[currentRecommend] = 1)
      : (recommendedData[currentRecommend] += 1);
  });
  return recommendedData;
};

const accessCharacteristics = (characteristics) => {
  const charData = {};
  let charName;
  let charId;
  let value;
  characteristics.forEach((char) => {
    charName = char.name;
    charId = parseFloat(char.characteristics_id);
    value = char.value;
    charData[charName] && (charName += charId);
    charData[charName] = {
      id: charId,
      value,
    };
  });
  return charData;
};

module.exports = {
  getMetadata: (req, res) => {
    const { product_id } = req.params;
    let ratings;
    let recommended;
    let characteristics;

    models.getRatings(product_id, (ratingsErr, ratingsRes) => {
      if (ratingsErr) {
        res.status(500).send(ratingsErr);
      }
      ratings = accessRatings(ratingsRes);
      models.getRecommends(product_id, (recommendsErr, recommendsRes) => {
        if (recommendsErr) {
          res.status(500).send(recommendsErr);
        }
        recommended = accessRecommends(recommendsRes);
        models.getCharacteristics(
          product_id,
          (characteristicsErr, characteristicsRes) => {
            if (characteristicsErr) {
              res.status(500).send(characteristicsErr);
            }
            characteristics = accessCharacteristics(characteristicsRes);
            res.status(200).json({
              product_id,
              ratings,
              recommended,
              characteristics,
            });
          },
        );
      });
    });
  },
};
