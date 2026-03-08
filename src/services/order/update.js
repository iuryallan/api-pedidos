const orderRepository = require("../../repositories/order");
const { transformOrderData } = require("../../utils/mapper");

module.exports = async function updateOrder(orderId, payload) {
  // transforma os dados que vieram em português
  const mappedData = transformOrderData(payload);

  // envia o id da url e os dados traduzidos pro repositório
  const updatedOrder = await orderRepository.updateOrderWithItems(
    orderId,
    mappedData,
  );

  return updatedOrder;
};
