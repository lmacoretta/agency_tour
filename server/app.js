import express from 'express';
import morgan from 'morgan';
import AppEror from './middleware/appError';

const app = express();
import { globalErrorHandler } from './middleware/errorMiddleware';

/** Middleware */
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

/** Routes */
app.use('/api/v1/tours', require('./routes/tourRoutes'));
app.use('/api/v1/users', require('./routes/userRoutes'));

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
