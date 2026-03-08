const pool = require("../../config/db");
const queries = require("../../queries/orderQueries");

module.exports = async function getAllOrders() {
  const client = await pool.connect();
  try {
    const result = await client.query(queries.getAllOrders);
    return result.rows;
  } finally {
    client.release();
  }
};
