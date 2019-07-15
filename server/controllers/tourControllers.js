const Tour = require('../models/tourModel');
const { catchAsync } = require('../helpers/routeHelpers');
//const AppError = require('../middleware/appError');

const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll
} = require('../controllers/handlerFactory');

module.exports = {
  getAllTour: getAll(Tour),
  getTourById: getOne(Tour, { path: 'reviews' }),
  createTour: createOne(Tour),
  updateTour: updateOne(Tour),
  deleteTour: deleteOne(Tour),

  getTourStats: catchAsync(async (req, res, next) => {
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
  }),

  getMonthlyPlan: catchAsync(async (req, res, next) => {
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
  })
};
