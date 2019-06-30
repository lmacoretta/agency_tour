import Tour from '../models/tourModel';

module.exports = {
  getAllTour: async (req, res, next) => {
    try {
      /** Filtro la query */
      const queryObj = { ...req.query };
      const excludeFields = ['page', 'sort', 'limit', 'fields'];
      excludeFields.forEach(el => delete queryObj[el]);

      /** Filtro mas avanzado */
      let queryString = JSON.stringify(queryObj);
      queryString = queryString.replace(
        /\b(gte|gt|lte|lt)\b/g,
        match => `$${match}`
      );

      const query = Tour.find(JSON.parse(queryString));

      /** Envio la query */
      const tour = await query;

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
