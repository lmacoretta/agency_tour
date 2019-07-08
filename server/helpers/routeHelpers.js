const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = {
  catchAsync: fn => {
    return (req, res, next) => {
      fn(req, res, next).catch(next);
    };
  },

  signToken: id => {
    return jwt.sign({ id }, process.env.SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  },

  sendEmail: async options => {
    /** Creo el transport */
    const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        username: process.env.EMAIL_USERNAME,
        password: process.env.EMAIL_PASSWORD
      }
    });

    /** Defino las opciones del email */
    const mailOptions = {
      from: 'Leandro Macoretta <test2@test.com>',
      to: options.email,
      subject: options.subject,
      text: options.message
    };

    /** Envio el mail */
    await transport.sendMail(mailOptions);
  }
};
