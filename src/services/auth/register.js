const bcrypt = require("bcrypt");
const userRepository = require("../../repositories/user");

module.exports = async function registerUser(username, password) {
  // verifica se o usuário já existe
  const existingUser = await userRepository.getByUsername(username);
  if (existingUser) {
    throw new Error("USER_ALREADY_EXISTS");
  }

  // criptografa a senha 
  const hashedPassword = await bcrypt.hash(password, 10);

  // salva no banco com a senha embaralhada
  const newUser = await userRepository.create(username, hashedPassword);
  return newUser;
};
