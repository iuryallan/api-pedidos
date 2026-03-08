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

async function getOrderById(orderId) {
  const client = await pool.connect();

  try {
    // busca o pedido na tabela principal
    const orderResult = await client.query(
      `SELECT * FROM "Order" WHERE orderId = $1`,
      [orderId],
    );

    // se não encontrou nada, retorna null para o service tratar
    if (orderResult.rows.length === 0) {
      return null;
    }

    // busca os itens relacionados a esse pedido
    const itemsResult = await client.query(
      `SELECT * FROM Items WHERE orderId = $1`,
      [orderId],
    );

    // monta o objeto completo juntando as duas buscas
    const fullOrder = {
      ...orderResult.rows[0],
      items: itemsResult.rows,
    };

    return fullOrder;
  } finally {
    client.release();
  }
}

async function getAllOrders() {
  const client = await pool.connect();
  try {
    const result = await client.query(`SELECT * FROM "Order"`);
    return result.rows;
  } finally {
    client.release();
  }
}

async function deleteOrderById(orderId) {
  const client = await pool.connect();

  try {
    // deleta o pedido e o cascade no banco apaga os itens automaticamente
    const result = await client.query(
      `DELETE FROM "Order" WHERE orderId = $1 RETURNING *`,
      [orderId],
    );

    // se rowCount for 0, quer dizer que nenhum pedido com esse id existia
    if (result.rowCount === 0) {
      return null;
    }

    return result.rows[0]; // retorna os dados do pedido que foi deletado
  } finally {
    client.release();
  }
}

async function updateOrderWithItems(orderId, orderData) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // atualiza a tabela principal
    const updateOrderQuery = `
            UPDATE "Order" 
            SET value = $1, creationDate = $2 
            WHERE orderId = $3 
            RETURNING *;
        `;
    const orderResult = await client.query(updateOrderQuery, [
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
    await client.query(`DELETE FROM Items WHERE orderId = $1`, [orderId]);

    // insere os novos itens
    const insertItemQuery = `
            INSERT INTO Items (orderId, productId, quantity, price) 
            VALUES ($1, $2, $3, $4);
        `;
    for (const item of orderData.items) {
      await client.query(insertItemQuery, [
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
}

module.exports = {
  createOrderWithItems,
  getOrderById,
  getAllOrders,
  deleteOrderById,
  updateOrderWithItems,
};
