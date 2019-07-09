const User = require('../models/userModel');
const { catchAsync, filterObj } = require('../helpers/routeHelpers');
const AppError = require('../middleware/appError');

module.exports = {
  getAllUsers: catchAsync(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users
      }
    });
  }),

  getUserById: async (req, res) => {},

  createUser: async (req, res) => {},

  updateUser: async (req, res) => {},

  deleteUser: async (req, res) => {},

  updateMe: catchAsync(async (req, res, next) => {
    if (req.body.password || req.body.passwordConfirm) {
      next(
        new AppError(
          'No puedes ingresar un password aqui, si queres modificar tu password por favor ir a /updateMyPassword',
          400
        )
      );
    }

    /** FIltro para que solo sea name y email lo que pueda updatear */
    const filterBody = filterObj(req.body, 'name', 'email');

    /** Updateo los campos del usuario */
    const updateUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
      new: true, //Me crea un documento nuevo
      runValidators: true //Me corre los validadores de nuevo
    });

    res.status(200).json({
      status: 'success',
      data: {
        user: updateUser
      }
    });
  }),

  deleteMe: catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
      status: 'success',
      data: null
    });
  })
};
