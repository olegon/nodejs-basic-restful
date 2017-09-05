const app = require('./app');

app.listen(process.env.PORT, function () {
    console.log(`O servidor está escutando na porta ${process.env.PORT}.`);
});
