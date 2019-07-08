const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const brcrypt = require('bcryptjs');

const { Schema } = mongoose;

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

  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,

  photo: {
    type: String
  },

  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user'
  }
});

/** Encrypto la password */
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  this.password = await brcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined; //Lo hago asi para que no lo guarde en la db. Es solo un campo requerido.
  next();
});

/** Verifico password */
userSchema.methods.verifyPassword = async function(
  candidatePassword,
  userPassword
) {
  return await brcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changeTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10 //Indica una conversión a número decimal
    );

    return JWTTimestamp < changeTimeStamp;
  }

  //Falso significa que no fue cambiado
  return false;
};

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  //Creo un hash y le digo que me encripte en ese algoritmo, despues que el resetToken que esta en string me lo updatee y lo hashee, y por ultimo lo digo que ese hash lo guarde en hexadecimal.
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);
  //Aca como quiero que el token desp de 10 minutos expire, le paso el Date.now() (Hora de 1970 en milesgundos, hasta hoy en dia) y le digo que sume 10 (los 10 minutos) y lo transformo en milisegundo, osea * 60 (primero a segundos) y * 1000 (despues a milisegundos)
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model('User', userSchema);
