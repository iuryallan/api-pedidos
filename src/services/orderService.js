const orderRepository = require("../repositories/orderRepository");
const { transformOrderData } = require("../utils/mapper");

async function processNewOrder(payload) {
  // aplica a transformação de dados exigida
  const mappedData = transformOrderData(payload);

  // chama o repositório para persistir os dados
  const savedOrder = await orderRepository.createOrderWithItems(mappedData);

  // retorna o resultado para o Controller
  return savedOrder;
}

async function getOrder(orderId) {
  const order = await orderRepository.getOrderById(orderId);
  return order;
}

async function listOrders() {
  const orders = await orderRepository.getAllOrders();
  return orders;
}

async function deleteOrder(orderId) {
  const deletedOrder = await orderRepository.deleteOrderById(orderId);
  return deletedOrder;
}

async function updateOrder(orderId, payload) {
  // transforma os dados que vieram em português
  const mappedData = transformOrderData(payload);

  // envia o id da url e os dados traduzidos pro repositório
  const updatedOrder = await orderRepository.updateOrderWithItems(
    orderId,
    mappedData,
  );

  return updatedOrder;
}

module.exports = {
  processNewOrder,
  getOrder,
  listOrders,
  deleteOrder,
  updateOrder,
};
