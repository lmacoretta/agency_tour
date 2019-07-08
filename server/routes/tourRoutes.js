const express = require('express');

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

router.route('/top-5-cheap').get(aliasTopTours, getAllTour);

router.route('/tour-stats').get(getTourStats);

router.route('/montly-plan/:year').get(getMonthlyPlan);

router
  .route('/')
  .get(auth, getAllTour)
  .post(createTour);

router
  .route('/:id')
  .get(getTourById)
  .patch(updateTour)
  .delete(auth, restricTo('admin', 'lead-guide'), deleteTour);

//Patch actualiza solo las propiedades que queramos, put actualiza todo el objeto entero.

module.exports = router;
