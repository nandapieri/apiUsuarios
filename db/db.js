const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require('mongoose');


function create() {
    const mongo = new MongoMemoryServer()
    return mongo;
}

const mongod = create();

module.exports.connect = async () => {
    await mongod.start();
    const uri = mongod.getUri()
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
    })
  
    //const uri = 'mongodb://localhost:27017/crud-node-mongo-docker';
}

module.exports.closeDatabase = async () => {
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