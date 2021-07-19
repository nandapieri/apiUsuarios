const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors())

// Adicionando arquivo de rota no endpoint /usuarios
const usuarios = require('./routes/usuario');

app.use('/api/usuarios', usuarios);

module.exports = app