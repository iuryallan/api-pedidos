const orderService = require("../../services/order");

module.exports = async function updateOrder(req, res) {
  try {
    const { id } = req.params;
    const payload = req.body;

    const updatedOrder = await orderService.updateOrder(id, payload);

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ error: "Pedido não encontrado para atualização." });
    }

    res.status(200).json({
      message: "Pedido atualizado com sucesso!",
      data: updatedOrder,
    });
  } catch (error) {
    console.error("Erro ao atualizar pedido:", error);
    res
      .status(500)
      .json({ error: "Erro interno no servidor ao atualizar o pedido." });
  }
};
