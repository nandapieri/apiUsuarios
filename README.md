# Projeto Cadastro de usuários

O objetivo dessa aplicação é realizar um cadastro de usuários e exibir uma lista de usuários cadastrados com filtro de nome e email e possibilidade de excluir qualquer um deles.

## Regras de negócio

- Ao cadastrar o cliente, primeiro pede-se o e-mail, e o restante dos campos deve ser preenchido usando os dados da API: https://jsonplaceholder.typicode.com/users se encontrados.

- Se encontrados, todos os dados retornados pela API de dados devem ser exibidos/inseridos no formulário de cadastro e salvos ao clicar em salvar.

## Stack escolhida

### Backend

O backend foi criado usando Node.JS, Express, MongoDB e Docker.

### Frontend

O frontend foi criado com HTML5, CSS e Javascript.

## Instruções

### Requisitos

Para rodar esse projeto é necessário ter instalados o Node.js, o Docker e o Docker Compose. Guias para instalar:

  - Node.js: https://nodejs.org/en/download/
  - Docker: https://docs.docker.com/engine/install/
  - Docker Compose: https://docs.docker.com/compose/install/
  
### Passo a passo

* Crie uma cópia deste reposótio:
```   
  $ git clone https://github.com/nandapieri/apiUsuarios.git
```

* Navegue até a pasta do projeto via terminal e baixe as dependencias:
```
  $ npm init
```

* Suba os containers e o servidor:
```
  $ docker-compose up
```

* Em uma outra janela do terminal, suba a aplicação cliente:
```
  $ http-server
```

* Acesse o link da aplicação cliente exibido no terminal. Exemplo:
```
    Starting up http-server, serving ./
    Available on:
    http://127.0.0.1:8080
    http://192.168.1.121:8080
    http://172.17.0.1:8080
    http://172.20.0.1:8080
```