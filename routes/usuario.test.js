const supertest = require('supertest');
const db = require('../db/db')
const usuariodb = require('../db/usuario')
const app = require('../app');
const mongoose = require('mongoose');
const inputSchema = require('../schemas/inputSchema')

beforeAll(async () => {
  await db.connect()
    .then(() => {
      app.listen(5000, () => console.log('Server ativo na porta 5000'));
    })
 })
afterEach(async () => await db.clearDatabase())
afterAll(async () => await db.closeDatabase())

jest.setTimeout(30000);
describe('rota Get', () => {
   it('sucesso', async () => {
    
    await supertest(app).get('/api/usuarios/')
        .then(response => {
          expect(response.statusCode).toEqual(200);  
        })    
  })
})  

describe('rota Post - buscar por email', () => {
  it('sucesso', async () => {
    const user = {
      nome: "Leanne Graham",	
      usuario: "Bret",
      email: "Sincere@april.biz"
    }
    await usuariodb.criarUsuario(user)
    const body = {
      email: "Sincere@april.biz"
    }
    await supertest(app).post('/api/usuarios/buscar').send(body)
        .then(response => {
          expect(response.statusCode).toEqual(200);  
          expect(response.body).toHaveProperty('nome',user.nome);
          expect(response.body).toHaveProperty('usuario',user.usuario);
          expect(response.body).toHaveProperty('email',user.email);
        })    
  })
  it('email não encontrado', async () => {
    const user = {
      nome: "Leanne Graham",	
      usuario: "Bret",
      email: "Sincere@april.biz"
    }
    await usuariodb.criarUsuario(user)
    const body = {
      email: "asdsdasa@teste.com"
    }
    await supertest(app).post('/api/usuarios/buscar').send(body)
        .then(response => {
          expect(response.statusCode).toEqual(404);  
        })    
  })

  it('request inválida', async () => {
    const user = {
      nome: "Leanne Graham",	
      usuario: "Bret",
      email: "Sincere@april.biz"
    }
    await usuariodb.criarUsuario(user)
    await supertest(app).post('/api/usuarios/buscar').send()
        .then(response => {
          expect(response.statusCode).toEqual(400);  
        })    
  })
}) 

describe('rota Post - novo usuário', () => {
  it('sucesso', async () => {
    const user = {
      nome: "Leanne Graham",	
      usuario: "Bret",
      email: "Sincere@april.biz"
    }
    await supertest(app).post('/api/usuarios/novo').send(user)
        .then(response => {
          expect(response.statusCode).toEqual(201);  
          expect(response.body).toHaveProperty('nome',user.nome);
          expect(response.body).toHaveProperty('usuario',user.usuario);
          expect(response.body).toHaveProperty('email',user.email);
        })    
  })
  it('erro', async () => {
    const user = {
      nome: "Leanne Graham",	
      usuario: "Bret"
    }
    await supertest(app).post('/api/usuarios/novo').send(user)
        .then(response => {
          expect(response.statusCode).toEqual(400);  
        })    
  })

  it('erro', async () => {
    const user = {
      nome: "Leanne Graham",	
      usuario: 12347
    }
    await supertest(app).post('/api/usuarios/novo').send(user)    
      .then(response => {
          expect(response.statusCode).toEqual(400);  
        })    
  })
})

describe('rota Put', () => {
  it('sucesso', async () => {
    const user = {
      nome: "Leanne Graham",	
      usuario: "Bret",
        email: "Sincere@april.biz"
    }
    const newUser = {
        nome: "teste",	
        usuario: "teste"
    }
    const created = await usuariodb.criarUsuario(user);
    const id = created._id;
    const url = '/api/usuarios/editar/'+id;
    await supertest(app).put(url).send(newUser)
        .then(response => {
          expect(response.statusCode).toEqual(200);  
          expect(response.body).toHaveProperty('nome',newUser.nome);
          expect(response.body).toHaveProperty('usuario',newUser.usuario);
          
        })    
  })
  it('id não encontrado', async () => {
    const user = {
      nome: "Leanne Graham",	
      usuario: "Bret",
      email: "Sincere@april.biz"
    }
    const newUser = {
        nome: "teste",	
        usuario: "teste",
        email: "teste"
    }
    const created = await usuariodb.criarUsuario(user);
    const id = "50f3a811b9f6c91610f8eac0"
    const url = '/api/usuarios/editar/'+id;
    await supertest(app).put(url).send(newUser)
        .then(response => {
          expect(response.statusCode).toEqual(404);  
        })    
  })

  it('erro', async () => {
    const user = {
      nome: "Leanne Graham",	
      usuario: "Bret",
      email: "Sincere@april.biz"
    }
    const newUser = {
        nome: "teste",	
        usuario: "teste",
        email: 121231
    }
    const created = await usuariodb.criarUsuario(user);
    const id = created._id;
    const url = '/api/usuarios/editar/'+id;
    
    await supertest(app).put(url).send(newUser)    
      .then(response => {
          expect(response.statusCode).toEqual(400);  
        })    
  })
}) 

describe('rota Delete', () => {
  it('sucesso', async () => {
    const user = {
      nome: "Leanne Graham",	
      usuario: "Bret",
      email: "Sincere@april.biz"
    }
    
    const created = await usuariodb.criarUsuario(user);
    const id = created._id;
    const url = '/api/usuarios/delete/'+id;
    await supertest(app).delete(url).send()
        .then(response => {
          expect(response.statusCode).toEqual(200);  
          expect(response.body).toHaveProperty('nome',user.nome);
          expect(response.body).toHaveProperty('usuario',user.usuario);
          expect(response.body).toHaveProperty('email',user.email);
        })    
  })
  it('id não encontrado', async () => {
    
    const id = "50f3a811b9f6c91610f8eac0"
    const url = '/api/usuarios/editar/'+id;
    await supertest(app).delete(url).send()
        .then(response => {
          expect(response.statusCode).toEqual(404);  
        })    
  })
}) 