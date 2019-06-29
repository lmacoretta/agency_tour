const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose
  .connect(
    `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    { useNewUrlParser: true }
  )
  .then(db => console.log('Base de datos conectada'));
