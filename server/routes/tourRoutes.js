import express from 'express';
const router = express.Router();

import {
  getAllTour,
  createTour,
  getTourById,
  updateTour,
  deleteTour,
  getTourStats,
  getMonthlyPlan
} from '../controllers/tourControllers';

import { aliasTopTours } from '../middleware/routeMiddelware';

router.route('/top-5-cheap').get(aliasTopTours, getAllTour);

router.route('/tour-stats').get(getTourStats);

router.route('/montly-plan/:year').get(getMonthlyPlan);

router
  .route('/')
  .get(getAllTour)
  .post(createTour);

router
  .route('/:id')
  .get(getTourById)
  .patch(updateTour)
  .delete(deleteTour);

//Patch actualiza solo las propiedades que queramos, put actualiza todo el objeto entero.

module.exports = router;
