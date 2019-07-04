import express from 'express';
const router = express.Router();

import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/userControllers';

import { signUp, signIn } from '../controllers/authController';

router.route('/signup').post(signUp);
router.route('/signin').post(signIn);

router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUserById)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
