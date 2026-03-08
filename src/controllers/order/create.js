const orderService = require("../../services/order");

module.exports = async function createOrder(req, res) {
  try {
    const result = await orderService.processNewOrder(req.body);

    // devolve o status HTTP 201 (created)
    res.status(201).json({
      message: "Pedido criado com sucesso!",
      data: result,
    });
  } catch (error) {
    console.error("Erro ao criar pedido:", error);

    // tratamento de erro específico do postgres para chave duplicada
    if (error.code === "23505") {
      return res
        .status(409)
        .json({ error: "Um pedido com este ID já existe." });
    }

    res
      .status(500)
      .json({ error: "Erro interno no servidor ao processar o pedido." });
  }
};
