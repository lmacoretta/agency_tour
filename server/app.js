import express from 'express';
import morgan from 'morgan';
const app = express();

/** Middleware */
app.use(express.json());
app.use(morgan('dev'));

/** Routes */
app.use('/api/v1/tours', require('./routes/tourRoutes'));
app.use('/api/v1/users', require('./routes/userRoutes'));

module.exports = app;
