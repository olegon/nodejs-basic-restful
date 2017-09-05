const { PORT, SECRET } = process.env;

if (SECRET == null) {
    throw new Error('A variável de ambiente SECRET é obrigatória.');
}

if (PORT == null) {
    throw new Error('A variável de ambiente PORT é obrigatória.');
}

const app = require('./app');

app.listen(PORT, function () {
    console.log(`O servidor está escutando na porta ${PORT}.`);
});
