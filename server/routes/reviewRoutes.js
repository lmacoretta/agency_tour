const express = require('express');
const {
  auth,
  restricTo,
  setToursUserIds
} = require('../middleware/routeMiddelware');

const router = express.Router({ mergeParams: true });

const {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  getReview
} = require('../controllers/reviewController');

router.use(auth);

router
  .route('/')
  .get(getAllReviews)
  .post(restricTo('user'), setToursUserIds, createReview);

router
  .route('/:id')
  .get(getReview)
  .delete(restricTo('user', 'admin'), deleteReview)
  .patch(restricTo('user', 'admin'), updateReview);

module.exports = router;
