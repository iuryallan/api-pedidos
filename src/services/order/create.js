const orderRepository = require("../../repositories/order");
const { transformOrderData } = require("../../utils/mapper");

module.exports = async function processNewOrder(payload) {
  // aplica a transformação de dados exigida
  const mappedData = transformOrderData(payload);

  // chama o repositório para persistir os dados
  const savedOrder = await orderRepository.createOrderWithItems(mappedData);

  // retorna o resultado para o Controller
  return savedOrder;
};
