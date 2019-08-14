const { check } = require('express-validator');

module.exports = {
  signUpVal: [
    check('name', 'El nombre es requerido')
      .not()
      .isEmpty(),
    check('email')
      .isEmail()
      .withMessage('Por favor, incluya un email valido'),
    check('password')
      .isLength({ min: 6 })
      .withMessage('Por favor, ingrese un password correcto')
      .exists()
  ],

  signInVal: [
    check('email')
      .isEmail()
      .withMessage('Por favor, incluya un email valido'),
    check('password')
      .isLength({ min: 6 })
      .withMessage('Por favor, ingrese un password correcto')
      .exists()
  ]
};
