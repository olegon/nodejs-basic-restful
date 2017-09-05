const express = require('express');
const bodyParser = require('body-parser');
const User = require('../user/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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

router.get('/me', function (req, res) {
    const { 'x-access-token': token } = req.headers;

    if (!token) return res.status(401).send({ auth: false, message: 'Token not provided.' });

    jwt.verify(token, SECRET, function (err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token. '});

        User.findById(decoded.id, { password: 0 } /* omits password */, function (err, user) {
            if (err) return res.status(500).send('Something got wrong!');

            if (!user) return res.status(404).send('User not found.');

            res.status(200).send(user);
        });
    });
});

module.exports = router;
