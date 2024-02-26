const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'user' } // use 'admin' for administrative privileges
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
