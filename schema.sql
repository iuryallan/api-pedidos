-- Tabela de Usuários (Autenticação Básica)
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Tabela de Pedidos
CREATE TABLE "Order" (
    orderId VARCHAR(50) PRIMARY KEY,
    value NUMERIC(10, 2) NOT NULL,
    creationDate TIMESTAMP NOT NULL
);

-- Tabela de Itens do Pedido
CREATE TABLE Items (
    itemId SERIAL PRIMARY KEY,
    orderId VARCHAR(50) REFERENCES "Order"(orderId) ON DELETE CASCADE,
    productId VARCHAR(50) NOT NULL,
    quantity INTEGER NOT NULL,
    price NUMERIC(10, 2) NOT NULL
);