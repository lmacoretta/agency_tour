const jwt = require('jsonwebtoken');
const AppError = require('../middleware/appError');
const User = require('../models/userModel');

module.exports = {
  aliasTopTours: async (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
  },

  auth: async (req, res, next) => {
    // Me fijo si el token está
    const token = req.header('x-auth-token');

    //Si no hay, error.
    if (!token) {
      return next(
        new AppError('No estas logeado. Por favor, inicia sesion'),
        401
      );
    }

    //Verifico que sea valido
    const decoded = await jwt.verify(token, process.env.SECRET);

    //Busco si el usuario existe con el id del jwt.
    const currentUser = await User.findById(decoded.id);

    //Si no está, error
    if (!currentUser) {
      next(
        new AppError(
          'El token que le pertenece a este usuario ya no existe',
          401
        )
      );
    }

    //Me fijo que el usuario no haya cambiado el password
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError(
          'El usuario ha cambiado recientemente el password, por favor, ingrese nuevamente',
          401
        )
      );
    }

    //Si no hay error, deja continuar a la ruta
    req.user = currentUser;
    next();
  },

  restricTo: (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        //req.user.role lo puedo usar por el auth middleware que se ejecuta antes que este.
        //Includes determina si un array tiene determinado elemento, como por ejemplo el rol de usuario.
        next(
          new AppError(
            'No tienes la autorizacion necesaria para realizar esta accion',
            403
          )
        );
      }

      next();
    };
  }
};
