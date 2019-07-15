const Review = require('../models/reviewModel');

const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll
} = require('../controllers/handlerFactory');

module.exports = {
  getAllReviews: getAll(Review),
  createReview: createOne(Review),
  deleteReview: deleteOne(Review),
  updateReview: updateOne(Review),
  getReview: getOne(Review)
};
