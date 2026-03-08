const authService = require("../../services/auth");

module.exports = async function login(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Usuário e senha são obrigatórios." });
    }

    const token = await authService.login(username, password);

    res.status(200).json({ message: "Autenticado com sucesso!", token });
  } catch (error) {
    if (error.message === "INVALID_CREDENTIALS") {
      return res.status(401).json({ error: "Usuário ou senha incorretos." });
    }
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
};
