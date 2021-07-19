const db = require('./db')
const usuariodb = require('./usuario')
const mongoose = require('mongoose')

beforeAll(async () => {await db.connect()})
afterEach(async () => await db.clearDatabase())
afterAll(async () => await db.closeDatabase())

jest.setTimeout(50000);

describe('Testes operação criar usuario', () => {
    it('criar usuario com dados validos', async () => {
        const user = {
            nome: "Leanne Graham",	
            usuario: "Bret",
            email: "Sincere@april.biz"
        }
        await usuariodb.criarUsuario(user)
        .then(res => {
            expect(res).toBeDefined()
            expect(res).toHaveProperty('nome',user.nome);
            expect(res).toHaveProperty('usuario',user.usuario);
            expect(res).toHaveProperty('email',user.email);
        })    
    })
    it('criar usuario com dados inválidos', async () => {
        const user = {
            nome: "Leanne Graham",	
            usuario: "Bret"
        }
        try {
            await usuariodb.criarUsuario(user);
        } catch (e) {
            expect(e).toBeInstanceOf(mongoose.Error.ValidationError)
        }
                
    })
})

describe('Testes operação listar', () => {
    it('listar com banco vazio', async () => {
        const userList = [];
        await usuariodb.listarUsuarios()
            .then(res => {
                expect(res).toBeDefined()
                expect(res).toEqual(expect.arrayContaining(userList))
            })
    })
    it('listar com usuário cadastrado', async () => {
        const user = {
            nome: "Leanne Graham",	
            usuario: "Bret",
            email: "Sincere@april.biz"
        }
        const created = await usuariodb.criarUsuario(user);
        userList = [created];
        await usuariodb.listarUsuarios()
        .then(res => {
            expect(res).toBeDefined()
            expect.arrayContaining(userList)
        })
        
    })
})

describe('Testes operação buscar por email', () => {
    it('buscar por um email existente', async () => {
        const user = {
            nome: "Leanne Graham",	
            usuario: "Bret",
            email: "Sincere@april.biz"
        }
        const created = await usuariodb.criarUsuario(user);
        userList = [created];
        const email = "Sincere@april.biz"
        await usuariodb.buscarPorEmail(email)
        .then(res => {
            expect(res).toBeDefined()
            expect.arrayContaining(userList)
        })    
    })
    it('buscar por um email não existente', async () => {
        const user = {
            nome: "Leanne Graham",	
            usuario: "Bret",
            email: "Sincere@april.biz"
        }
        const created = await usuariodb.criarUsuario(user);
        userList = [created];
        const email = "teste@teste.com"
        try {
            await usuariodb.buscarPorEmail(email)
        } catch (e) {
            expect(e).toEqual("usuário não encontrado")
        }
    })
})

describe('Testes operação editar usuário', () => {
    it('editar usuário com id existente', async () => {
        const user = {
            nome: "Leanne Graham",	
            usuario: "Bret",
            email: "Sincere@april.biz"
        }
        const newUser = {
            nome: "teste",	
            usuario: "teste",
            email: "teste@teste.com"
        }
        const created = await usuariodb.criarUsuario(user);
        const id = created._id;

        await usuariodb.editarUsuario(id, newUser)
        .then(res => {
            expect(res).toBeDefined()
            expect(res).toHaveProperty('nome',newUser.nome);
            expect(res).toHaveProperty('usuario',newUser.usuario);
            expect(res).toHaveProperty('email',newUser.email);
        })    
    })
    it('editar usuário com id não existente', async () => {
        const user = {
            nome: "Leanne Graham",	
            usuario: "Bret",
            email: "Sincere@april.biz"
        }
        const newUser = {
            nome: "teste",	
            usuario: "teste",
            email: "teste@teste.com"
        }
        const created = await usuariodb.criarUsuario(user);
        const id = "50f3a811b9f6c91610f8eac0"
        try {
            await usuariodb.editarUsuario(id, newUser)
        } catch (e) {
            expect(e).toEqual("Usuário não encontrado")
        }
    })
})

describe('Testes operação apagar usuário', () => {
    it('apagar usuário com id existente', async () => {
        const user = {
            nome: "Leanne Graham",	
            usuario: "Bret",
            email: "Sincere@april.biz"
        }
        const created = await usuariodb.criarUsuario(user);
        const id = created._id;

        await usuariodb.apagarUsuario(id)
        .then(res => {
            expect(res).toBeDefined()
            expect(res).toHaveProperty('nome',user.nome);
            expect(res).toHaveProperty('usuario',user.usuario);
            expect(res).toHaveProperty('email',user.email);
        })    
    })
    it('apagr usuário com id não existente', async () => {
        const user = {
            nome: "Leanne Graham",	
            usuario: "Bret",
            email: "Sincere@april.biz"
        }
        
        const created = await usuariodb.criarUsuario(user);
        const id = "50f3a811b9f6c91610f8eac0"
        try {
            await usuariodb.apagarUsuario(id)
        } catch (e) {
            expect(e).toEqual("Usuário não encontrado")
        }
    })
})

