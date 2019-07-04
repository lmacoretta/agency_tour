import mongoose from 'mongoose';
import validator from 'validator';
import brcrypt from 'bcryptjs';
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
    minlength: [8, 'El password no puede tener menos de 6 caracteres'],
    select: false //Para que no muestre la password por ejemplo en postman.
  },

  passwordConfirm: {
    type: String,
    required: [true, 'Por favor, confirme su password'],
    validate: {
      //Esto funciona solo en el create o save, no en update por ejemplo.
      validator: function(el) {
        return el === this.password;
      },
      message: 'Los passwords no son iguales'
    }
  },

  photo: {
    type: String
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  this.password = await brcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined; //Lo hago asi para que no lo guarde en la db. Es solo un campo requerido.
  next();
});

userSchema.methods.verifyPassword = async function(
  candidatePassword,
  userPassword
) {
  return await brcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model('User', userSchema);
