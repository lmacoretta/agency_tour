const mongoose = require('mongoose');

const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    review: {
      type: String,
      required: [true, 'La critica no puede estar vacia']
    },

    rating: {
      type: Number,
      min: 1,
      max: 5
    },

    createAt: {
      type: Date,
      default: Date.now
    },

    tour: {
      type: Schema.Types.ObjectId,
      ref: 'Tour',
      required: [true, 'La critica debe tener un tour']
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'La critica debe tener un usuario']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

reviewSchema.pre(/^find/, function(next) {
  /*
  this.populate({
    path: 'tour',
    select: 'name'
  }).populate({
    path: 'user',
    select: 'name photo'
  });
  */

  this.populate({
    path: 'user',
    select: 'name photo'
  });

  next();
});

module.exports = mongoose.model('Review', reviewSchema);
