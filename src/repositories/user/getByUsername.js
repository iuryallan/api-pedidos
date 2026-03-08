const pool = require("../../config/db");
const queries = require("../../queries/userQueries");

module.exports = async function getUserByUsername(username) {
  const client = await pool.connect();
  try {
    const result = await client.query(queries.getUserByUsername, [username]);
    if (result.rows.length === 0) return null;
    return result.rows[0];
  } finally {
    client.release();
  }
};
