const Joi = require('joi');

module.exports = Joi.object({
  nome: Joi.string().required(),
  usuario: Joi.string().required(),
  email: Joi.string().required(),
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
});