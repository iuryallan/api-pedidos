const authService = require("../../services/auth");

module.exports = async function register(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Usuário e senha são obrigatórios." });
    }

    const newUser = await authService.register(username, password);

    res
      .status(201)
      .json({ message: "Usuário criado com sucesso!", user: newUser });
  } catch (error) {
    if (error.message === "USER_ALREADY_EXISTS") {
      return res
        .status(409)
        .json({ error: "Este nome de usuário já está em uso." });
    }
    console.error("Erro ao registrar usuário:", error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
};
