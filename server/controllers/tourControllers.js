import Tour from '../models/tourModel';
import APIFeatures from '../helpers/apiFeatures';

module.exports = {
  getAllTour: async (req, res, next) => {
    try {
      /** Envio la query */
      const features = new APIFeatures(Tour.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate(); //Esto funciona porque retorno el this en el objeto.

      const tour = await features.query;

      /** Respuesta */
      res.status(200).json({
        data: {
          status: 'success',
          results: tour.length,
          tour
        }
      });
    } catch (err) {
      res.status(404).json({
        sucess: 'fail',
        msg: err
      });
    }
  },

  getTourById: async (req, res, next) => {
    try {
      const tour = await Tour.findById(req.params.id);

      res.status(200).json({
        data: {
          tour
        }
      });
    } catch (err) {
      res.status(404).json({
        sucess: 'fail',
        msg: err
      });
    }
  },

  createTour: async (req, res, next) => {
    try {
      const newTour = await Tour.create(req.body);

      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    } catch (err) {
      res.status(400).json({
        success: 'fail',
        msg: err
      });
    }
  },

  updateTour: async (req, res) => {
    try {
      const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });

      res.status(200).json({
        status: 'success',
        data: {
          tour
        }
      });
    } catch (err) {
      res.status(400).json({
        success: 'fail',
        msg: err
      });
    }
  },

  deleteTour: async (req, res) => {
    try {
      await Tour.findByIdAndDelete(req.params.id);

      res.status(204).json({
        status: 'success'
      });
    } catch (err) {
      res.status(400).json({
        success: 'fail',
        msg: err
      });
    }
  }
};
