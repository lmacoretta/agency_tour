import express from 'express';
const router = express.Router();

import { getAllTour, createTour, getTourById } from '../controllers/tourControllers';

router.route('/').get(getAllTour);
router.route('/:id').get(getTourById);
router.route('/').post(createTour);

//Patch actualiza solo las propiedades que queramos, put actualiza todo el objeto entero.


module.exports = router;