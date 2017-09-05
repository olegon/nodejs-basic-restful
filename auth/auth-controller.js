const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verifyTokenMiddleware = require('./verify-token-middleware');
const User = require('../user/user');


const { SECRET } = process.env;

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/register', function (req, res) {
    const { name, email, password } = req.body;

    bcrypt.hash(password, 8)
    .then((hashedPassword) => {

        User.create({ name, email, password: hashedPassword }, function (err, user) {
            if (err) return res.status(500).send("Something got wrong!");
    
            const token = jwt.sign({ id: user._id }, SECRET, {
                expiresIn: 24 * 3600 // 1 day
            });
    
            res.status(200).send({ auth: true, token });
        });

    })
    .catch((err) => res.status(500).send("Something got wrong!"));

   
});

router.post('/login', function (req, res) {
    const { email, password } = req.body;

    User.findOne({ email }, function (err, user) {
        if (err) return res.status(500).send('Something got wrong!');

        if (!user) return res.status(404).send('User not found.');

        bcrypt.compare(password, user.password)
        .then((isPasswordValid) => {
            if (!isPasswordValid) return res.status(401).send({ auth: false, token: null });    

            const token = jwt.sign({ id: user._id }, SECRET, {
                expiresIn: 24 * 3600
            });

            res.status(200).send({ auth: true, token });
        })
        .catch(() => res.status(500).send('Something got wrong!'));
    });

});

router.get('/logout', function (req, res) {
    res.send(200).send({ auth: false, token: null });
});

router.get('/me',  verifyTokenMiddleware, function (req, res) {
    User.findById(req.userId, { password: 0 } /* omits password */, function (err, user) {
        if (err) return res.status(500).send('Something got wrong!');

        if (!user) return res.status(404).send('User not found.');

        res.status(200).send(user);
    });
});

module.exports = router;
