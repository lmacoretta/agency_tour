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

const { auth, getMe, restricTo } = require('../middleware/routeMiddelware');

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

// Proteje todas las rutas despues de este middleware
router.use(auth);

router.get('/me', getMe, getUserById);
router.patch('/updateMyPassword', updatePassword);
router.patch('/updateMe', updateMe);
router.delete('/deleteMe', deleteMe);

router.use(restricTo('admin'));

router
  .route('/')
  .get(getAllUsers)
  .post(createUser); //no implementado

router
  .route('/:id')
  .get(getUserById)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
