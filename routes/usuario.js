const express = require('express');
const router = express.Router();

const Usuario = require('../models/Usuario');

// Retorna um array com todos os documentos do banco de dados
router.get('/', (req, res) => {
  Usuario.find()
    .then(usuarios => {
      res.json(usuarios);
    })
    .catch(error => res.status(500).json(error));
});

// Cria um novo documento e salva no banco
router.post('/novo', (req, res) => {
  const novoUsuario = new Usuario({
    email: req.body.email,
    nome: req.body.nome
  });

  novoUsuario
    .save()
    .then(result => {
      res.json(result);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// Atualiza dados de um usuário já existente
router.put('/editar/:id', (req, res) => {
  const novosDados = { email: req.body.email, nome: req.body.nome };

  Usuario.findOneAndUpdate({ _id: req.params.id }, novosDados, { new: true })
    .then(usuario => {
      res.json(usuario);
    })
    .catch(error => res.status(500).json(error));
});

// Deletando um carro do banco de dados
router.delete('/delete/:id', (req, res) => {
  Usuario.findOneAndDelete({ _id: req.params.id })
    .then(usuario => {
      res.json(usuario);
    })
    .catch(error => res.status(500).json(error));
});


module.exports = router;