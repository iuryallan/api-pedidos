module.exports = {
  createUser: `INSERT INTO Users (username, password) VALUES ($1, $2) RETURNING id, username`,
  getUserByUsername: `SELECT * FROM Users WHERE username = $1`,
};
