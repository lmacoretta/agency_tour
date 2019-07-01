import express from 'express';
import morgan from 'morgan';

const app = express();

/** Middleware */
app.use(express.json());
app.use(morgan('dev'));

/** Routes */
app.use('/api/v1/tours', require('./routes/tourRoutes'));
app.use('/api/v1/users', require('./routes/userRoutes'));

app.all('*', (req, res, next) => {
  const err = new Error(
    `No se puede encontrar ${req.originalUrl} en este servidor!`
  );
  err.status = 'fail';
  err.statusCode = 404;

  next(err);
});

/** Error handling middleware */
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
});

module.exports = app;
