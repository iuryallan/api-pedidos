const orderRepository = require("../../repositories/order");
const { transformOrderData } = require("../../utils/mapper");

module.exports = async function listOrders() {
  const orders = await orderRepository.getAllOrders();
  return orders;
};
