const express = require('express');
const { auth, restricTo } = require('../middleware/routeMiddelware');

const router = express.Router();

const {
  getAllReviews,
  createReview
} = require('../controllers/reviewController');

router
  .route('/')
  .get(getAllReviews)
  .post(auth, restricTo('user'), createReview);

module.exports = router;
