const express = require('express');

const router = express.Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe
} = require('../controllers/userControllers');

const {
  signUp,
  signIn,
  forgotPassword,
  resetPassword,
  updatePassword
} = require('../controllers/authController');

const { auth } = require('../middleware/routeMiddelware');

router.route('/signup').post(signUp);
router.route('/signin').post(signIn);
router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword/:token').patch(resetPassword);
router.route('/updateMyPassword').patch(auth, updatePassword);
router.route('/updateMe').patch(auth, updateMe);
router.route('/deleteMe').delete(auth, deleteMe);

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
