const { catchAsync } = require('../helpers/routeHelpers');
const AppError = require('../middleware/appError');
const APIFeatures = require('../helpers/apiFeatures');

module.exports = {
  deleteOne: Model => {
    return catchAsync(async (req, res, next) => {
      const doc = await Model.findByIdAndDelete(req.params.id);

      if (!doc) {
        next(new AppError('No se encuentra el documeneto', 404));
      }

      res.status(204).json({
        status: 'success'
      });
    });
  },

  updateOne: Model => {
    return catchAsync(async (req, res, next) => {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });

      if (!doc) {
        return next(
          new AppError('No se encuentra una excursion con ese id', 404)
        );
      }

      res.status(200).json({
        status: 'success',
        data: {
          doc
        }
      });
    });
  },

  createOne: Model => {
    return catchAsync(async (req, res, next) => {
      const newTour = await Model.create(req.body);

      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    });
  },

  getOne: (Model, popOptions) => {
    return catchAsync(async (req, res, next) => {
      let query = Model.findById(req.params.id);
      if (popOptions) query = query.populate(popOptions);
      const doc = await query;

      if (!doc) {
        return next(
          new AppError('No se encuentra una excursion con ese id', 404)
        );
      }

      res.status(200).json({
        status: 'success',
        data: {
          data: doc
        }
      });
    });
  },

  getAll: Model => {
    return catchAsync(async (req, res, next) => {
      // Obtengo todos los review pero de un solo tour (hack)
      let filter = {};
      if (req.params.tourId) filter = { tour: req.params.tourId };

      /** Envio la query */
      const features = new APIFeatures(Model.find(filter), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate(); //Esto funciona porque retorno el this en el objeto.

      const doc = await features.query;

      /** Respuesta */
      res.status(200).json({
        data: {
          status: 'success',
          results: doc.length,
          doc
        }
      });
    });
  }
};
