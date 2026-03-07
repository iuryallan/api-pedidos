-- 1. cria a tabela principal de pedidos
CREATE TABLE "Order" (
  orderId VARCHAR(255) PRIMARY KEY,
  value NUMERIC(10, 2) NOT NULL,
  creationDate TIMESTAMP NOT NULL
);

-- 2. cria a tabela de itens com a chave estrangeira
CREATE TABLE Items (
  id SERIAL PRIMARY KEY,
  orderId VARCHAR(255) NOT NULL,
  productId INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  CONSTRAINT fk_order
    FOREIGN KEY(orderId) 
    REFERENCES "Order"(orderId)
    ON DELETE CASCADE
);