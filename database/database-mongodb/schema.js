const mongoose = require('mongoose');
const db = require('./index.js');

const reviewsSchema = new mongoose.Schema({
  product_id: Number,
  rating: String,
  summary: String,
  recommend: Number,
  response: String,
  body: String,
  date: String,
  reviewer_name: String,
  reviewer_email: String,
  helpfulness: Number,
  reported: Boolean,
  photos: [String],
  characteristics: {},
});

const reviewsModule = mongoose.model('rrmodule', reviewsSchema);
