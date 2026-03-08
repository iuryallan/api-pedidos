const orderRepository = require("../../repositories/order");
const { transformOrderData } = require("../../utils/mapper");

module.exports = async function getOrder(orderId) {
  const order = await orderRepository.getOrderById(orderId);
  return order;
};
