const Tour = require('../models/tourModel');
const { catchAsync } = require('../helpers/routeHelpers');
const AppError = require('../middleware/appError');

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
  }),

  //ruta tours-within/:distance/center/:latlng/unit/:unit
  //tours-whitin?distance=223&center=-40,45&unit=mi queryString
  //tours-whitin/233/center/-40,45/unit/mi params
  getToursWithin: catchAsync(async (req, res, next) => {
    const { distance, latlng, unit } = req.params;
    const [lat, lng] = latlng.split(',');

    const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1; //3963.2 Radio de la tierra en millas, 6378.1 radio en km.

    if (!lat || !lng) {
      next(new AppError('Por favor, ingrese la latitud y longitud', 400));
    }

    const tours = await Tour.find({
      startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
    });
    //geoWithin busca documentos con geometria, entonces esa geometria es la que le paso, por eso se lo paso con centerSphere. Tambien mongo espera que le pase un radius, en una unidad especial llamada radiant.

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        data: tours
      }
    });
  }),

  getDistance: catchAsync(async (req, res, next) => {
    const { latlng, unit } = req.params;
    const [lat, lng] = latlng.split(',');

    const multiplier = unit === 'mi' ? 0.000621371 : 0.001;

    if (!lat || !lng) {
      next(new AppError('Por favor, ingrese la latitud y longitud', 400));
    }

    const distance = await Tour.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [lng * 1, lat * 1]
          },

          distanceField: 'distance',
          distanceMultiplier: multiplier
        }
      },

      {
        $project: {
          distance: 1,
          name: 1
        }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        data: distance
      }
    });
  })
};
