const app = require('./app')
const mongoose = require('mongoose');


mongoose
  .connect('mongodb://db:27017/crud-node-mongo-docker', {
  //.connect('mongodb://localhost:27017/crud-node-mongo-docker', {
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



