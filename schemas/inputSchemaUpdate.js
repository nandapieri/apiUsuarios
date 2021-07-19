const Joi = require('joi');

module.exports = Joi.object({
  nome: Joi.string(),
  usuario: Joi.string(),
  email: Joi.string(),
  endereco: {
    logradouro: Joi.string(),
    complemento: Joi.string(),
    cidade: Joi.string(),
    cep: Joi.string(),
    geo: {
      lat: Joi.string(),
      lng: Joi.string(),
    }
  },
  telefone: Joi.string(),
  website: Joi.string(),
  empresa: {
    nome: Joi.string(),
    frase: Joi.string(),
    ramo: Joi.string(),
  }
}).min(1);