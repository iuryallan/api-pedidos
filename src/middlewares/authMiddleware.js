const jwt = require("jsonwebtoken");

module.exports = function verifyToken(req, res, next) {
  // pega o header de autorização
  const authHeader = req.headers["authorization"];

  // como padrão web é enviar "Bearer <token>", o split separa a palavra do token
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(403)
      .json({ error: "Nenhum token fornecido. Acesso negado." });
  }

  // tenta abrir o token com a nossa chave secreta
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token inválido ou expirado." });
    }

    // se deu tudo certo, salva os dados do usuário na requisição e chama o next()
    req.user = decoded;
    next(); // deixa a requisição continuar para o controller de pedidos
  });
};
