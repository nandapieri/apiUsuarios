const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongod = new MongoMemoryServer();

module.exports.connect = async () => {
    const uri = await mongod.getUri();
    //const uri = 'mongodb://localhost:27017/crud-node-mongo-docker';
    mongoose.connect(uri, {
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
}

module.exports.closeConnection = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
}

module.exports.clearDatabase = async () => {
    const colections = mongoose.connection.collections;
    for (const key in colections) {
        const colection = colections[key];
        await colection.deleteMany();
    }
}