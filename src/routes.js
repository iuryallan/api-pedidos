const express = require("express");
const router = express.Router();

const orderController = require("./controllers/order");
const authController = require('./controllers/auth');
const authMiddleware = require('./middlewares/authMiddleware');

// rotas de autenticação (públicas)
router.post('/register', authController.register);
router.post('/login', authController.login);

// rotas de pedido (protegidas)

// rota POST para criar o pedido
router.post("/order", authMiddleware, orderController.createOrder);

// rota GET para buscar todos os pedidos
router.get("/order/list", authMiddleware, orderController.listOrders);

// rota GET para buscar um pedido específico
router.get("/order/:id", authMiddleware, orderController.getOrder);

// rota PUT passando o id como parâmetro
router.put("/order/:id", authMiddleware, orderController.updateOrder);

// rota DELETE passando o id como parâmetro
router.delete("/order/:id", authMiddleware, orderController.deleteOrder);

module.exports = router;
