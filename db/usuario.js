const Usuario = require('../models/Usuario');

module.exports.listarUsuarios = async  () => {
    return new Promise((resolve, reject) => {
        Usuario.find()
            .then(usuarios => {
                if(usuarios) {
                    resolve(usuarios);  
                } else {
                    reject("Lista não encontrada")
                }
            })
            .catch(error => {
                reject(error);
            })
    })
}

      
module.exports.buscarPorEmail = async (email) => {
    
    return new Promise((resolve, reject) => {
        Usuario.findOne({ email: email })
         .then(usuario => {
            if(usuario){
                resolve(usuario) 
            }
            else {
                reject("usuário não encontrado");
                }
            })
         .catch(error => {
            reject(error);
        })
    })
}

module.exports.criarUsuario = async  (usuario) => {
    return new Promise((resolve, reject) => {
        const novoUsuario = new Usuario(usuario);
        novoUsuario
        .save()
        .then(result => {
            if(result)
                resolve(result);
            else
                reject("Erro ao criar usuário")
        })
        .catch(error => {
            reject(error);
        });
    })
    
}

module.exports.editarUsuario = async  (id, novosDados) => {
    return new Promise((resolve, reject) => {
        Usuario.findOneAndUpdate({ _id: id }, novosDados, { new: true })
        .then(usuario => {
            if(usuario) 
                resolve(usuario)
            else
                reject("Usuário não encontrado")
        })
        .catch(error => {
            reject(error);
        });
    })
    
}   

module.exports.apagarUsuario = async  (id) => {
    return new Promise((resolve, reject) => {
        Usuario.findOneAndDelete({ _id: id })
        .then(usuario => {
            if(usuario) 
                resolve(usuario)
            else
                reject("Usuário não encontrado")
        })
        .catch(error => {
            reject(error);
        });
    })
    
}