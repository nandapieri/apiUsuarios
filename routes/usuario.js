const express = require('express');
const router = express.Router();
const inputSchema = require('../schemas/inputSchema')
const inputSchemaUpdate = require('../schemas/inputSchemaUpdate')
const dbUsuario = require('../db/usuario')
const Usuario = require('../models/Usuario');

// Retorna um array com todos os documentos do banco de dados
router.get('/', async (req, res) => {
  try {
    await dbUsuario.listarUsuarios()
      .then((usuarios) => {
        res.status(200).json(usuarios);
      })
      
  } catch(error) {
    res.status(500).json({message: error});
  }
});

//encontra um usuário por email
router.post('/buscar', async (req, res) => {

  try {
    if(req.body.email) {
      await dbUsuario.buscarPorEmail(req.body.email)
      .then((usuario) => {
        res.status(200).json(usuario);
      })
    } else {
      res.status(400).json({message: "email is required"});
    }
  } catch(error) {
      res.status(404).json({message: error});
  }
});

// Cria um novo documento e salva no banco
router.post('/novo', async (req, res) => { 
  try {
     const validaDados = await inputSchema.validateAsync(req.body);
     const novoUsuario = new Usuario(req.body);
     await dbUsuario.criarUsuario(novoUsuario)
      .then((usuario) => {
        res.status(201).json(usuario);
      })
  } catch(error) {
      res.status(400).json({message: error});
  }
});

// Atualiza dados de um usuário já existente
router.put('/editar/:id', async (req, res) => {
  try {
      const validaDados = await inputSchemaUpdate.validateAsync(req.body);
      const novosDados = req.body;
      await dbUsuario.editarUsuario(req.params.id,novosDados)
      .then((usuario) => {
        res.status(200).json(usuario);
      }).catch(error => {
        res.status(404).json(error);
      })   
  } catch(error) {
      res.status(400).json({message: error});
  }
});

// Apagar um usuario do banco de dados
router.delete('/delete/:id', async (req, res) => {
  try {
    if(req.params.id) {
        await dbUsuario.apagarUsuario(req.params.id)
      .then((usuario) => {
        res.status(200).json(usuario);
      })
      .catch(error => {
        res.status(404).json(error);
      })
    }
    else {
      res.status(400).json({message: "Bad request"});
    }
  } catch(error) {
      res.status(400).json({message: error});
  }
});


module.exports = router;