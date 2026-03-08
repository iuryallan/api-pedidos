const pool = require("../../config/db");
const queries = require("../../queries/orderQueries");

module.exports = async function updateOrderWithItems(orderId, orderData) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // atualiza a tabela principal
    const orderResult = await client.query(queries.updateOrder, [
      orderData.value,
      orderData.creationDate,
      orderId,
    ]);

    // se o pedido não existir cancela a transação e retorna nulo
    if (orderResult.rowCount === 0) {
      await client.query("ROLLBACK");
      return null;
    }

    // deleta os itens antigos
    await client.query(queries.deleteItemsByOrderId, [orderId]);

    // insere os novos itens
    for (const item of orderData.items) {
      await client.query(queries.insertItem, [
        orderId,
        item.productId,
        item.quantity,
        item.price,
      ]);
    }

    await client.query("COMMIT");

    // retorna os dados com o id que foi usado na busca
    return { orderId, ...orderData };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
