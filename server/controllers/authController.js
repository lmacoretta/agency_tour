const User = require('../models/userModel');
const { catchAsync, signToken } = require('../helpers/routeHelpers');
const AppError = require('../middleware/appError');

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
  })
};
