module.exports = {
  insertOrder: `INSERT INTO "Order" (orderId, value, creationDate) VALUES ($1, $2, $3) RETURNING *`,
  insertItem: `INSERT INTO Items (orderId, productId, quantity, price) VALUES ($1, $2, $3, $4)`,

  getOrderById: `SELECT * FROM "Order" WHERE orderId = $1`,
  getItemsByOrderId: `SELECT * FROM Items WHERE orderId = $1`,

  getAllOrders: `SELECT * FROM "Order"`,

  updateOrder: `UPDATE "Order" SET value = $1, creationDate = $2 WHERE orderId = $3 RETURNING *`,
  deleteItemsByOrderId: `DELETE FROM Items WHERE orderId = $1`,

  deleteOrder: `DELETE FROM "Order" WHERE orderId = $1 RETURNING *`,
};
