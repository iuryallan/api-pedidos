const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("../../repositories/user");

module.exports = async function loginUser(username, password) {
  // busca o usuário no banco
  const user = await userRepository.getByUsername(username);
  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }

  // compara a senha digitada com o hash salvo no banco
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("INVALID_CREDENTIALS");
  }

  // se tudo estiver certo gera o token jwt
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  return token;
};
