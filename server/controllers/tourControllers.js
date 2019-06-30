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
      res.status(404).json({
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
      res.status(404).json({
        success: 'fail',
        msg: err
      });
    }
  },

  getTourStats: async (req, res) => {
    try {
      const stats = await Tour.aggregate([
        {
          $match: { ratingsAverage: { $gte: 4.5 } } //Match es un select document basicamente.
        },
        {
          $group: {
            //_id: { $toUpper: '$difficulty' },
            //_id: '$ratingsAverage',
            _id: '$difficulty',
            numTours: { $sum: 1 },
            numRatings: { $sum: '$ratingsQuantity' },
            avgRating: { $avg: '$ratingsAverage' },
            avgPrice: { $avg: '$price' },
            minPrice: { $min: '$price' },
            maxPrice: { $max: '$price' }
          }
        },
        {
          $sort: { avgPrice: 1 }
        }
        //{
        // $match: { _id: { $ne: 'easy' } }
        //}
      ]);

      res.status(200).json({
        status: 'success',
        data: {
          stats
        }
      });
    } catch (err) {
      res.status(404).json({
        success: 'fail',
        msg: err
      });
    }
  },

  getMonthlyPlan: async (req, res) => {
    try {
      const year = req.params.year * 1; //Lo transformo a number. 2021

      const plan = await Tour.aggregate([
        {
          $unwind: '$startDates' //Me hace un documento con varias fechas en varios documentos distintos. Te hace un destructuring.
        },
        {
          $match: {
            startDates: {
              //Le digo que me traiga desde el 2021-01-01 hasta fin de año.
              $gte: new Date(`${year}-01-01`), //2021
              $lte: new Date(`${year}-12-31`)
            }
          }
        },
        {
          $group: {
            _id: { $month: '$startDates' }, //Extraigo todo por el mes. Lo agrupa por mes.
            numTourStarts: { $sum: 1 }, //Me suma los tours que empiezan en ese mes.
            tours: { $push: '$name' } //Me agrega los nombres de ese tour. Como en un mes puede empezar varios, le digo $push porque es un array.
          }
        },
        {
          $addFields: { month: '$_id' } //Le agrego el mes asi no uso el _id de mongo.
        },
        {
          $project: { _id: 0 } //No me muestra el id de mongo.
        },
        {
          $sort: { numTourStarts: -1 } //Ordena de mayor a menor.
        }
        //{
        //limit: 6
        //}
      ]);

      res.status(200).json({
        status: 'success',
        data: {
          plan
        }
      });
    } catch (err) {
      res.status(404).json({
        success: 'fail',
        msg: err
      });
    }
  }
};
