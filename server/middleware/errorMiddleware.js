const AppError = require('../middleware/appError');

/** Id mal */
const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value} `;
  return new AppError(message, 400);
};

/** Campos duplicados */
const handleDuplicateFieldsDB = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]; //Extraigo el error de mongo con una expresion regular. El errmsg es un campo que envia mongo cuando el dato esta duplicado. Tambien le digo que me extraiga el primer elemento de ese array, porque la expresion extrae todo lo que esta en comillas.
  const message = `Campo duplicado: ${value}. Por favor, ingrese otro valor`;

  return new AppError(message, 400);
};

/** Erorr de JWT */
const handleJWTError = () =>
  new AppError('El token no es valido, por favor ingrese de nuevo', 401);

/** Error cuando expira el token */
const handleJWTExpiredError = () =>
  new AppError('El token expiro! Por favor, ingresa nuevamente', 401);

/** Errores de validacion */
const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);

  const message = `Datos invalidos. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

/** Envio los errores en desarrollo */
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

/** Envio los errores en produccion */
const sendErrorPro = (err, res) => {
  //Si el error es operacional, lo mando al cliente
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });

    //Error operacional puede ser: Que un usuario entre a un ruta que no existe, o ponga en un input datos invalidos, etc.

    // Error de programacion o otro error desconocido: No muestro el detalle del erorr.
  } else {
    //Log error
    console.error('ERROR', err); //Lo muestra en la consola donde este hosteado.

    //Mando un mensaje generico
    res.status(500).json({
      status: 'error',
      message: 'Ups, Algo salio muy mal!'
    });
  }
};

module.exports = {
  globalErrorHandler: (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
      sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === 'production') {
      let error = { ...err }; //Hago una copia del error porque es mala practica mutar el err de mongo.

      if (error.name === 'CastError') error = handleCastErrorDB(error); //Error para ID mal.
      //Casterror es el error que te manda mongo por ejemplo cuando buscas un producto por ID y en mes de manderle un id correcto, le mandas cualquiera.
      if (error.code === 11000) error = handleDuplicateFieldsDB(error);
      if (error.name === 'ValidationError')
        error = handleValidationErrorDB(error);
      if (error.name === 'JsonWebTokenError') error = handleJWTError();
      if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

      sendErrorPro(error, res);
    }
  }
};
