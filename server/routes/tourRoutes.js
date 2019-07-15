const express = require('express');
const reviewRouter = require('../routes/reviewRoutes');

const router = express.Router();

const {
  getAllTour,
  createTour,
  getTourById,
  updateTour,
  deleteTour,
  getTourStats,
  getMonthlyPlan
} = require('../controllers/tourControllers');

const {
  aliasTopTours,
  auth,
  restricTo
} = require('../middleware/routeMiddelware');

router.use('/:tourId/reviews', reviewRouter);

router.route('/top-5-cheap').get(aliasTopTours, getAllTour);

router.route('/tour-stats').get(getTourStats);

router
  .route('/montly-plan/:year')
  .get(auth, restricTo('admin', 'lead-guide', 'guide'), getMonthlyPlan);

router
  .route('/')
  .get(getAllTour)
  .post(auth, restricTo('admin', 'lead-guide'), createTour);

router
  .route('/:id')
  .get(getTourById)
  .patch(auth, restricTo('admin', 'lead-guide'), updateTour)
  .delete(auth, restricTo('admin', 'lead-guide'), deleteTour);

//router.route('/:tourId/reviews').post(auth, restricTo('user'), createReview);

module.exports = router;
