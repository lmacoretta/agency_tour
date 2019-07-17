const mongoose = require('mongoose');

const { Schema } = mongoose;

const tourSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'La excursion debe tener un nombre'],
      unique: true,
      trim: true,
      maxlength: [
        40,
        'El nombre de la excursion debe estar en 40 o mas caracteres'
      ],
      minlength: [
        10,
        'El nombre de la excursion debe tener minimo 10 o mas caracteres'
      ]
      //validate: [validator.isAlpha, 'El nombre de la excursion solo debe contener caracteres']
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
      required: [true, 'La excursion debe tener una dificultad'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'La dificultad tiene que ser Easy, Medium o Difficult'
      }
    },

    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'El rating minimo no puede ser menor a 1.0'],
      max: [5, 'El rating maximo no pude ser mayor a 5.0'],
      set: val => Math.round(val * 10) / 10 //4.6666, 46.6, 47, 4.7
    },

    ratingsQuantity: {
      type: Number,
      default: 0
    },

    price: {
      type: Number,
      required: [true, 'La excursion debe tener un precio']
    },

    priceDiscount: {
      type: Number,
      validate: {
        validator: function(val) {
          //Solo funciona cuando se crea un nuevo tour y no en update.
          return val < this.price;
        },

        message:
          'El precio del descuento ({VALUE}) debe ser menor al precio de la excursion'
      }
    },

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

    startDates: [Date],

    secretTours: {
      type: Boolean,
      default: false
    },

    startLocation: {
      //GeoJSON
      type: {
        type: String,
        default: 'Point',
        enum: ['Point']
      },
      coordinates: [Number],
      address: String,
      description: String
    },

    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point']
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number
      }
    ],

    guides: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ slug: 1 });

/** Funcion para hacer un populate en todas las rutas que busque. Lo hago asi para no repetir codigo */
tourSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangeAt'
  });
  next();
});

/** Virtual populate - El dato no se almacena en la BD */
tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id'
});

module.exports = mongoose.model('Tour', tourSchema);
