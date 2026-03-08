const pool = require("../../config/db");
const queries = require("../../queries/orderQueries");

module.exports = async function getOrderById(orderId) {
  const client = await pool.connect();

  try {
    // busca o pedido na tabela principal
    const orderResult = await client.query(queries.getOrderById, [orderId]);

    // se não encontrou nada, retorna null para o service tratar
    if (orderResult.rows.length === 0) {
      return null;
    }

    // busca os itens relacionados a esse pedido
    const itemsResult = await client.query(queries.getItemsByOrderId, [
      orderId,
    ]);

    // monta o objeto completo juntando as duas buscas
    const fullOrder = {
      ...orderResult.rows[0],
      items: itemsResult.rows,
    };

    return fullOrder;
  } finally {
    client.release();
  }
};
