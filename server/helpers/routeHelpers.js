import jwt from 'jsonwebtoken';

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
  }
};
