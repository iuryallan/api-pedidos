const orderService = require("../../services/order");

module.exports = async function listOrders(req, res) {
  try {
    const orders = await orderService.listOrders();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Erro ao listar pedidos:", error);
    res
      .status(500)
      .json({ error: "Erro interno no servidor ao listar pedidos." });
  }
};
