require('dotenv').config();
const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());

app.use('/', routes);

// rota de health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});