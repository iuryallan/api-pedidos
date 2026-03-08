const orderRepository = require("../../repositories/order");
const { transformOrderData } = require("../../utils/mapper");

module.exports = async function deleteOrder(orderId) {
  const deletedOrder = await orderRepository.deleteOrderById(orderId);
  return deletedOrder;
};
