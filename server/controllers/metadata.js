/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
/* eslint-disable no-console */
const models = require('../models/metadata.js');

const accessRatings = (ratings) => {
  const ratingsObj = {};
  ratings.forEach((rating) => {
    const currentRating = rating.rating;
    ratingsObj[currentRating] === undefined
      ? (ratingsObj[currentRating] = 1)
      : (ratingsObj[currentRating] += 1);
  });
  return ratingsObj;
};

const accessRecommends = (recommended) => {
  const recommendedObj = {};
  recommended.forEach((recommend) => {
    const currentRecommend = recommend.recommend;
    recommendedObj[currentRecommend] === undefined
      ? (recommendedObj[currentRecommend] = 1)
      : (recommendedObj[currentRecommend] += 1);
  });
  return recommendedObj;
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
