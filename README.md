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

## Fonte

[Hackernoon - “Hello World!” app with Node.js and Express](https://medium.com/@adnanrahic/hello-world-app-with-node-js-and-express-c1eb7cfa8a30)

[Hackernoon - RESTful API design with Node.js](https://hackernoon.com/restful-api-design-with-node-js-26ccf66eab09)

[Hackernoon - Securing Node.js RESTful APIs with JSON Web Tokens](https://medium.freecodecamp.org/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52)
