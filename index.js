const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors())

// Adicionando arquivo de rota no endpoint /usuarios
const usuarios = require('./routes/usuario');

app.use('/api/usuarios', usuarios);

mongoose
  //.connect('mongodb://db:27018/crud-node-mongo-docker', {
  .connect('mongodb://localhost:27017/crud-node-mongo-docker', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(result => {
    console.log('MongoDB Conectado');
  })
  .catch(error => {
    console.log(error);
  });

app.listen(9000, () => console.log('Server ativo na porta 9000'));

module.exports = app