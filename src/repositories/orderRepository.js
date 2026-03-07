const pool = require("../config/db");

async function createOrderWithItems(orderData) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // insere o pedido
    const insertOrderText = `INSERT INTO "Order" (orderId, value, creationDate) VALUES ($1, $2, $3)`;
    await client.query(insertOrderText, [
      orderData.orderId,
      orderData.value,
      orderData.creationDate,
    ]);

    // insere os itens
    const insertItemText = `INSERT INTO Items (orderId, productId, quantity, price) VALUES ($1, $2, $3, $4)`;
    for (const item of orderData.items) {
      await client.query(insertItemText, [
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
}

module.exports = {
  createOrderWithItems,
};
