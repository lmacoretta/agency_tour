import fs from 'fs';

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../../dev-data/data/tours-simple.json`));

module.exports = {
  getAllTour: async (req, res, next) => {
    res.status(200).json({
      status: 'Success',
      result: tours.length,
      tours: tours
    });
  },

  getTourById: async (req, res, next) => {
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);

    if (!tour) {
      res.status(404).json({ msg: 'No se encontro ningun tour' });
    }

    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    })
  },

  createTour: async (req, res, next) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTours = Object.assign({ id: newId }, req.body);

    tours.push(newTours);

    fs.writeFile(`${__dirname}/../../dev-data/data/tours-simple.json`,
      JSON.stringify(tours), err => {
        res.status(201).json({
          status: 'success',
          data: {
            tour: newTours
          }
        })
      })
  }
}