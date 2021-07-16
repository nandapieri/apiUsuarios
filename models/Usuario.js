
const mongoose = require('mongoose');
const { Schema } = mongoose;

const usuarioSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  nome: {
    type: String,
    require: true
  },
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

module.exports = module.exports =  mongoose.model('usuarios', usuarioSchema);