const pool = require('../../config/db');
const queries = require('../../queries/orderQueries');

module.exports = async function deleteOrderById(orderId) {
  const client = await pool.connect();

  try {
    // deleta o pedido e o cascade no banco apaga os itens automaticamente
    const result = await client.query(queries.deleteOrder, [orderId]);

    // se rowCount for 0, quer dizer que nenhum pedido com esse id existia
    if (result.rowCount === 0) return null;

    return result.rows[0]; // retorna os dados do pedido que foi deletado
  } finally {
    client.release();
  }
}