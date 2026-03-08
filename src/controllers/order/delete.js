const orderService = require("../../services/order");

module.exports = async function deleteOrder(req, res) {
  try {
    const { id } = req.params;

    const deletedOrder = await orderService.deleteOrder(id);

    if (!deletedOrder) {
      return res
        .status(404)
        .json({ error: "Pedido não encontrado para exclusão." });
    }

    res.status(200).json({ message: "Pedido deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar pedido:", error);
    res
      .status(500)
      .json({ error: "Erro interno no servidor ao deletar o pedido." });
  }
};
