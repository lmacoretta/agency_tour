import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const tourSchema = new Schema({
  name: {
    type: String,
    required: [true, 'La excursion debe tener un nombre'],
    unique: true
  },

  rating: {
    type: Number,
    default: 4.5
  },

  price: {
    type: Number,
    required: [true, 'La excursion debe tener un precio']
  }
});

module.exports = mongoose.model('Tour', tourSchema);
