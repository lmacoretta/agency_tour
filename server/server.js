/** Manejo de error cuando es codigo syncronico. */
process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT REJECTION, cerrando el servidor');
  process.exit(1);
});

const app = require('../server/app');

/** Config */
require('dotenv').config();
require('./database');

/** Server */
app.set('port', process.env.PORT || 4000);

const server = app.listen(app.get('port'), () => {
  console.log(`Server iniciado en el puerto ${app.get('port')}`);
});

/** Escucho en el evento unhandleRejection para cuando falla codigo asyncronico y no sea ni de mongoose ni de express. Le mando el error y cierro el server */
process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION, cerrando el servidor');
  server.close(() => {
    process.exit(1); //En la vida real, en mes de cerrar el programa, usamos algun herramienta para reiniciarlo.
  });
});
