const User = require('../models/userModel');
const { catchAsync, signToken } = require('../helpers/routeHelpers');
const AppError = require('../middleware/appError');
const { sendEmail } = require('../helpers/routeHelpers');

require('dotenv').config();

module.exports = {
  signUp: catchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body);

    const token = signToken(newUser._id);

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser
      }
    });
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

    const token = signToken(user._id);

    res.status(200).json({
      status: 'success',
      token
    });
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

  resetPassword: async (req, res, next) => {}
};
