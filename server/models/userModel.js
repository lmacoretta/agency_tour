import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({});

module.exports = mongoose.model('User', userSchema);