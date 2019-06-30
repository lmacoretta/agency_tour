import express from 'express';
const router = express.Router();

import {
  getAllTour,
  createTour,
  getTourById,
  updateTour,
  deleteTour
} from '../controllers/tourControllers';

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
