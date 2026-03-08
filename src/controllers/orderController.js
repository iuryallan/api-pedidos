const orderService = require("../services/orderService");

async function createOrder(req, res) {
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
}

async function getOrder(req, res) {
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
}

async function listOrders(req, res) {
  try {
    const orders = await orderService.listOrders();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Erro ao listar pedidos:", error);
    res
      .status(500)
      .json({ error: "Erro interno no servidor ao listar pedidos." });
  }
}

async function updateOrder(req, res) {
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
}

async function deleteOrder(req, res) {
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
}

module.exports = {
  createOrder,
  getOrder,
  listOrders,
  updateOrder,
  deleteOrder,
};
