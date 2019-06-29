import express from 'express';
const app = express();

import morgan from 'morgan';

/** Configs */
require('dotenv').config();
require('./database');

/** Middleware */
app.use(express.json());
app.use(morgan('dev'));

/** Routes */
//app.use('/api/auth', require('./routes/auth'));


/** Server */
app.set('port', process.env.PORT || 4000);

app.listen(app.get('port'), () => {
  console.log(`Server iniciado en el puerto ${app.get('port')}`);
});