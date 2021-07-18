const joi = require('joi');

module.exports = joi.object({
  nome: joi.string().required(),
  usuario: joi.string().required(),
  email: joi.string().required(),
  endereco: {
    logradouro: joi.string(),
    complemento: joi.string(),
    cidade: joi.string(),
    cep: joi.string(),
    geo: {
      lat: joi.string(),
      lng: joi.string(),
    }
  },
  telefone: joi.string(),
  website: joi.string(),
  empresa: {
    nome: joi.string(),
    frase: joi.string(),
    ramo: joi.string(),
  }
});
