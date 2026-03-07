require('dotenv').config(); 
const { Pool } = require('pg');

// cria o pool de conexões usando as variáveis de ambiente
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});

// teste pra ver se a conexão funciona logo ao iniciar
pool.on('connect', () => {
    console.log('Banco de dados conectado com sucesso!');
});

// tratamento de erros no pool de conexões
pool.on('error', (err) => {
    console.error('Erro inesperado no banco de dados', err);
    process.exit(-1);
});

module.exports = pool;