
const mongoose = require('mongoose');
const { Schema } = mongoose;

const db = require('../db/db')
const connect = async () => await db.connect();

const usuarioSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  nome: {
    type: String,
    require: true
  },
  usuario: {
    type: String,
    require: true
  },
  telefone: {
    type: String,
    require: false
  },
  website : {
    type: String,
    require: false
  },
  empresa: {
    nome: {
      type: String,
      require: false
    },
    frase: {
      type: String,
      require: false
    },
    ramo: {
      type: String,
      require: false
    }
  },
  endereco: {
    logradouro: {
      type: String,
      require: false
    },
    complemento: {
      type: String,
      require: false
    },
    cidade: {
      type: String,
      require: false
    },
    cep: {
      type: String,
      require: false
    },
    geo: {
      lat : {
        type: String,
        require: false
      },
      lng: {
        type: String,
        require: false
      },
    }
  }
});

module.exports = module.exports =  mongoose.model('usuarios', usuarioSchema);