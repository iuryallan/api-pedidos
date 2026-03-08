const pool = require("../../config/db");
const queries = require("../../queries/userQueries");

module.exports = async function createUser(username, hashedPassword) {
  const client = await pool.connect();
  try {
    const result = await client.query(queries.createUser, [
      username,
      hashedPassword,
    ]);
    return result.rows[0];
  } finally {
    client.release();
  }
};
