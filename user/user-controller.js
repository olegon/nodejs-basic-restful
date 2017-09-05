const express = require('express');
const bodyParser = require('body-parser');
const User = require('./user');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function (req, res) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send('Something got wrong!');

        res.status(200).send(users);
    });
});

router.get('/:id', function (req, res) {
    const { id } = req.params;

    User.findById(id, function (err, user) {
        if (err) return res.status(500).send('Something got wrong!');

        if (!user) return res.status(404).send('User not found.');

        res.status(200).send(user);
    });
});

router.post('/', function (req, res) {
    const { name, email, password } = req.body;

    User.create({
        name,
        email,
        password
    }, function (err, user) {
        if (err) return res.status(500).send('Something got wrong!');

        res.status(200).send(user);
    });
});

router.delete('/:id', function (req, res) {
    const { id } = req.params;

    User.findByIdAndRemove(id, function (err, user) {
        if (err) return res.status(500).send('Something got wrong!');

        return res.status(200).send(`The user ${id} was removed.`);
    });
});

router.put('/:id', function (req, res) {
    const { id } = req.params;
    const { name, email, password } = req.body;

    User.findByIdAndUpdate(id, { name, email, password }, function (err, user) {
        if (err) return res.status(500).send('Something got wrong!');

        return res.status(200).send(`The user ${id} was updated.`);
    });
});

module.exports = router;
