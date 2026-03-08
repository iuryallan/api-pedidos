const express = require('express');
const router = express.Router();
const orderController = require('./controllers/orderController');

// rota POST para criar o pedido
router.post('/order', orderController.createOrder);

router.get('/order/list', orderController.listOrders);

// rota GET para buscar um pedido específico
router.get('/order/:id', orderController.getOrder);

module.exports = router;