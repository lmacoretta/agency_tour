const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const AppEror = require('./middleware/appError');

const app = express();
const { globalErrorHandler } = require('./middleware/errorMiddleware');

/** Middleware */
app.use(helmet()); //Helmet ayuda a proteger la aplicación de algunas vulnerabilidades web conocidas mediante el establecimiento correcto de cabeceras HTTP.

app.use(express.json({ limit: '10kb' }));
require('dotenv').config();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

/** Data sanatizations agains NoSql query injection */
app.use(mongoSanitize());

/** Data sanatizations agains XSS */
app.use(xss());

/** Prevent parameter pollutions */
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsAverage',
      'ratingsQuantity',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);

/** Sirve para evitar ataques de fuerza bruta por ejemplo. Limita a 100 las llamadas a la api por hora */
const limiter = rateLimit({
  max: 100,
  windowsMs: 60 * 60 * 1000,
  message:
    'Muchas solicitudes a esta API en poco tiempo. Por favor, intenta nuevamente en una hora.'
});

app.use('/api', limiter);

/** Routes */
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/tours', require('./routes/tourRoutes'));
app.use('/api/v1/users', require('./routes/userRoutes'));
app.use('/api/v1/reviews', require('./routes/reviewRoutes'));

/** Error operacional Global - No existe la ruta */
app.all('*', (req, res, next) => {
  next(
    new AppEror(
      `No se puede encontrar ${req.originalUrl} en este servidor!`,
      404
    )
  );
});

/** Error handling middleware */
app.use(globalErrorHandler);

module.exports = app;
