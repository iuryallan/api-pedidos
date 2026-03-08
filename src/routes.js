const express = require('express');
const router = express.Router();
const orderController = require('./controllers/orderController');

// rota POST para criar o pedido
router.post('/order', orderController.createOrder);

// rota GET para buscar todos os pedidos
router.get('/order/list', orderController.listOrders);

// rota GET para buscar um pedido específico
router.get('/order/:id', orderController.getOrder);

// rota PUT passando o id como parâmetro
router.put('/order/:id', orderController.updateOrder);

// rota DELETE passando o id como parâmetro
router.delete('/order/:id', orderController.deleteOrder);

module.exports = router;