const User = require('../user/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { SECRET } = process.env;

function verifyToken (token) {
    return new Promise((res, rej) => {
        jwt.verify(token, SECRET, function (err, decoded) {
            if (err) return rej(err);
            
            res(decoded);
        });
    });
}

function verifyTokenMiddleware (req, res, next) {
    const { 'x-access-token': token } = req.headers;

    if (!token) return res.status(403).send({ auth: false, message: 'Token not provided.' });
    
    verifyToken(token)
    .then((decoded) => {
        req.userId = decoded.id;        
        next();
    })
    .catch(() => res.status(500).send({ auth: 'false', message: 'Failed to authenticate token.' }));
}

module.exports = verifyTokenMiddleware;