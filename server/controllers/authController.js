const User = require('../models/userModel');
const { catchAsync, signToken } = require('../helpers/routeHelpers');
const AppError = require('../middleware/appError');
const { sendEmail } = require('../helpers/routeHelpers');

require('dotenv').config();

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),

    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // Para que en la salida no me muestre el password
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

module.exports = {
  signUp: catchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body);

    createSendToken(newUser, 201, res);
  }),

  signIn: catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError('Por favor, ingrese su email o password', 400));
    }

    const user = await User.findOne({ email }).select('+password'); //Como no envio la password le digo que me la seleccione.

    if (!user || !(await user.verifyPassword(password, user.password))) {
      return next(new AppError('Email o Password incorrecta', 401));
    }

    createSendToken(user, 200, res);
  }),

  /** Password perdido */
  forgotPassword: catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      next(new AppError('No existe el usuario con ese email', 404));
    }

    /** Creo el token random */
    const resetToken = user.createPasswordResetToken();

    await user.save({ validateBeforeSave: false });
    //validateBeforeSave evito al momento de resetear el password (como solo envio el email) me pida todo los otros campos que son requeridos en el modelo.

    /** Envio el email */
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/resetPassword/${resetToken}`;

    const message = `Perdiste tu password? Por favor, envia un email con tu nueva password y confirmacion de esa password a: ${resetURL}. Si no perdiste el password, por favor ignora este mensaje.`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'El token para resetear el password es valido por 10 minutos',
        message
      });

      res.status(200).json({
        status: 'success',
        message: 'Token enviado al email!'
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });

      return next(
        new AppError('Hubo un error al enviar el email, intenta de nuevo!', 500)
      );
    }
  }),

  resetPassword: async (req, res, next) => {},

  /** Updateo el password del usuario */
  updatePassword: catchAsync(async (req, res, next) => {
    //Busco el usario
    const user = await User.findById(req.user.id).select('+password'); //Aca no puedo usar el findByIdAndUpdate porque en el modelo el validador de passwordConfirm manual que tiene y le puse no funciona con el update. Y tambien los middleware de 'save' en el modelo tampoco funciona cuando se hace el update.

    if (await !user.verifyPassword(req.body.passwordCurrent, user.password)) {
      next(
        new AppError(
          'Su password no es correcta, por favor verifique su informacion',
          401
        )
      );
    }

    /** Updateo el password */
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();

    createSendToken(user, 200, res);
  })
};
