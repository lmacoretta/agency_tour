const express = require('express');
const router = express.Router();
const { signUpVal, signInVal } = require('../middleware/validMiddleware');

const {
  signUp,
  signIn,
  protectUser
} = require('../controllers/authController');

const { auth } = require('../middleware/routeMiddelware');

router.post('/signup', signUpVal, signUp);
router.post('/signin', signInVal, signIn);
router.get('/protectUser', auth, protectUser);

module.exports = router;
