const express = require('express');
const { orderController } = require('../../controllers');

const router = express.Router();
router.post('/createOrder', orderController.createOrder);
router.get('/getAllOrders', orderController.getAllOrders);

module.exports = router;
