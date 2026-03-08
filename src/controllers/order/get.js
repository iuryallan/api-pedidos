const orderService = require("../../services/order");

module.exports = async function getOrder(req, res) {
  try {
    // extrai o id dinâmico da url
    const { id } = req.params;

    const order = await orderService.getOrder(id);

    // se o service retornou null, não existe no banco
    if (!order) {
      return res.status(404).json({ error: "Pedido não encontrado." });
    }

    // se tá ok, devolve com status 200
    res.status(200).json(order);
  } catch (error) {
    console.error("Erro ao buscar pedido:", error);
    res
      .status(500)
      .json({ error: "Erro interno no servidor ao buscar o pedido." });
  }
};
