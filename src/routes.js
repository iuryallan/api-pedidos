const express = require('express');
const router = express.Router();
const orderController = require('./controllers/orderController');

// rota POST para criar o pedido
router.post('/order', orderController.createOrder);

module.exports = router;