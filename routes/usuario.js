const express = require('express');
const router = express.Router();
const Joi = require('joi');
const inputSchema = require('../schemas/inputSchema')

const Usuario = require('../models/Usuario');
const { rawListeners } = require('..');

// Retorna um array com todos os documentos do banco de dados
router.get('/', (req, res) => {
  Usuario.find()
    .then(usuarios => {
      res.status(200).json(usuarios);
    })
    .catch(error => 
      res.status(500).json(error));
});

//encontra um usuário por email
router.post('/buscar', (req, res) => {
  Usuario.findOne({ email: req.body.email })
    .then(usuario => {
      if(usuario)
        res.status(200).json(usuario);
      else {
        res.status(404).json({ message: "usuário não encontrado"});
        }
      }        
    )
    .catch(error => 
      res.status(500).json(error));
});

// Cria um novo documento e salva no banco
router.post('/novo', async (req, res) => {

  try {
    const validaDados = await inputSchema.validateAsync(req.body);
    const novoUsuario = new Usuario(req.body);
    novoUsuario
    .save()
    .then(result => {
      res.status(201).json(result);
    })
    .catch(error => {
      res.status(500).json(error);
    });
  }
  catch (err) { 
    res.status(400).json(err.details);
  }
   
});

// Atualiza dados de um usuário já existente
router.put('/editar/:id', async (req, res) => {
  try {
    const validaDados = await inputSchema.validateAsync(req.body);
    const novosDados = req.body;
    Usuario.findOneAndUpdate({ _id: req.params.id }, novosDados, { new: true })
    .then(usuario => {
      res.status(200).json(usuario);
    })
    .catch(error => res.status(500).json(error));
  }
  catch (err) { 
    res.status(400).json(err.details);
  }
  
});

// Apagar um usuario do banco de dados
router.delete('/delete/:id', (req, res) => {
  Usuario.findOneAndDelete({ _id: req.params.id })
    .then(usuario => {
      res.status(200).json(usuario);
    })
    .catch(error => res.status(500).json(error));
});


module.exports = router;