const mongoose = require('mongoose');

const { Schema } = mongoose;

const tourSchema = new Schema({
  name: {
    type: String,
    required: [true, 'La excursion debe tener un nombre'],
    unique: true,
    trim: true
  },

  duration: {
    type: Number,
    required: [true, 'La excursion tiene que tener una duracion']
  },

  maxGroupSize: {
    type: Number,
    required: [
      true,
      'La excursion tiene que tener un numero maximo de participantes'
    ]
  },

  difficulty: {
    type: String,
    required: [true, 'La excursion debe tener una dificultad']
  },

  ratingsAverage: {
    type: Number,
    default: 4.5
  },

  ratingsQuantity: {
    type: Number,
    default: 0
  },

  price: {
    type: Number,
    required: [true, 'La excursion debe tener un precio']
  },

  priceDiscount: Number,

  summary: {
    type: String,
    trim: true,
    required: [true, 'La excursion debe tener una descripcion']
  },

  description: {
    type: String,
    trim: true
  },

  imageCover: {
    type: String,
    required: [true, 'La excursion debe tener una imagen']
  },

  images: [String],

  createAt: {
    type: Date,
    default: Date.now(),
    select: false
  },

  startDates: [Date]
});

module.exports = mongoose.model('Tour', tourSchema);
