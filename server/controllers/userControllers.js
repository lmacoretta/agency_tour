import User from '../models/userModel';
import { catchAsync } from '../helpers/routeHelpers';

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

  deleteUser: async (req, res) => {}
};
