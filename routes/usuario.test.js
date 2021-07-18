jest.setTimeout(30000);
const supertest = require('supertest');
const app = require('../index');

//mockar sucesso!
describe('rota Get', () => {
   /* it('sucesso', async () => {
  
      const response = await supertest(app).get('/');

      expect(response.statusCode).toEqual(200);  
    });
*/
    it('dados não encontrados', async () => {
  
        const response = await supertest(app).get('/');
  
        expect(response.statusCode).toEqual(404);  
      });
  
  });

  describe('rota post', () => {
       
      
      it('sucesso', async () => {
        const paramValidos = {
            nome: "fernanda",
            email: "nandapieri@gmail.com",
            usuario: "fernanda"
        }
        const response = await supertest(app).post('/novo').send(paramValidos);
  
        expect(response.statusCode).toEqual(201);  
      });

      it('parametros invalidos', async () => {
        const paramInvalidos = {
            nome: "fernanda"
        } 
        const response = await supertest(app).post('/novo').send(paramInvalidos);
  
        expect(response.statusCode).toEqual(400);  
    });
  })
  