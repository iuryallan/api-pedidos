// transforma o payload recebido (em português) para o formato do banco de dados (em inglês).

function transformOrderData(payload) {
  return {
    orderId: payload.numeroPedido,
    value: payload.valorTotal,
    // o javascript converte a string de data com fuso horário para o formato padrão ISO (UTC)
    creationDate: new Date(payload.dataCriacao).toISOString(),
    items: payload.items.map((item) => ({
      productId: Number(item.idItem), // o teste envia string, mas o banco espera número
      quantity: item.quantidadeItem,
      price: item.valorItem,
    })),
  };
}

module.exports = {
  transformOrderData,
};
