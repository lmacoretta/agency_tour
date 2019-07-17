const mongoose = require('mongoose');
const Tour = require('./tourModel');

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
      required: [true, 'La review debe tener un usuario']
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

reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

reviewSchema.statics.calcAverageRatings = async function(tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId }
    },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' } //$rating es de este modelo
      }
    }
  ]);

  //console.log(stats);

  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5
    });
  }
};

reviewSchema.post('save', function() {
  //this.constructor es basicamente es this.Review
  this.constructor.calcAverageRatings(this.tour);
});

reviewSchema.pre(/^findOneAnd/, async function(next) {
  this.r = await this.findOne();
  //console.log(this.r);
  next();
});

reviewSchema.post(/^findOneAnd/, async function() {
  //this.r = await this.findOne(); No puedo hacer esto aca porque la query ya se ejecuto
  await this.r.constructor.calcAverageRatings(this.r.tour);
});

module.exports = mongoose.model('Review', reviewSchema);
