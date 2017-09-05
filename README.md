# Implementação básica de uma API RESTful com _Nodejs_ + _MongoDB_

## Rotas

- __GET__ /user
- __GET__ /user/:id
- __POST__ /user/:id
    - name, email, password
- __PUT__ /user/:id
    - name, email, password
- __DELETE__ /user/:id

## Rodando a aplicação

```sh
docker run -d -p 27017:27017 --rm --name mongo mongo

PORT=8080 node server.js
```