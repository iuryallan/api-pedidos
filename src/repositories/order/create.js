const pool = require("../../config/db");
const queries = require("../../queries/orderQueries");

module.exports = async function createOrderWithItems(orderData) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // insere o pedido
    await client.query(queries.insertOrder, [
      orderData.orderId,
      orderData.value,
      orderData.creationDate,
    ]);

    for (const item of orderData.items) {
      await client.query(queries.insertItem, [
        orderData.orderId,
        item.productId,
        item.quantity,
        item.price,
      ]);
    }

    await client.query("COMMIT");
    return orderData;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error; // lança o erro para outra camada resolver
  } finally {
    client.release();
  }
};
