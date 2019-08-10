const User = require('../models/userModel');
const { catchAsync, signToken } = require('../helpers/routeHelpers');
const AppError = require('../middleware/appError');
const { sendEmail } = require('../helpers/routeHelpers');

require('dotenv').config();

module.exports = {
  signUp: catchAsync(async (req, res, next) => {
    const { name, email, password, passwordConfirm } = req.body;

    await User.create({
      //El create no hace falta el save
      name,
      email,
      password,
      passwordConfirm
    });

    res.status(201).json({
      status: 'success',
      message: 'Usuario creado!'
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

  protectUser: catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('-password');

    res.status(200).json(user);
  })
};
