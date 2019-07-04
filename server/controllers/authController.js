import User from '../models/userModel';
import { catchAsync } from '../helpers/routeHelpers';

module.exports = {
  signUp: catchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body);

    if (!newUser) {
      res.status(404).json({ message: 'El usuario no se encuentra' });
    }

    res.status(201).json({
      status: 'success',
      data: {
        user: newUser
      }
    });
  }),

  signIn: async (req, res, next) => {}
};
