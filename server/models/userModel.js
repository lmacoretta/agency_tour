import mongoose from 'mongoose';
import validator from 'validator';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true
  },

  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Por favor, ingrese un email valido']
  },

  password: {
    type: String,
    required: [true, 'El password es requerido'],
    minlength: [8, 'El password no puede tener menos de 6 caracteres']
  },

  passwordConfirm: {
    type: String,
    required: [true, 'Por favor, confirme su password']
  },

  photo: {
    type: String
  }
});

module.exports = mongoose.model('User', userSchema);
