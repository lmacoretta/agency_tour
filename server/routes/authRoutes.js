const express = require('express');
const router = express.Router();

const {
  signUp,
  signIn,
  protectUser
} = require('../controllers/authController');

const { auth } = require('../middleware/routeMiddelware');

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/protectUser', auth, protectUser);

module.exports = router;
