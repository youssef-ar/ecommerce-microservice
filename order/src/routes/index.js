const orderController = require('../controllers/orderController');
const express = require('express');
const router = express.Router();
const isAutherizedMiddleware = require('../middleware/isAutherizedMiddleware');

router.route('').get(isAutherizedMiddleware, orderController.getOrderHistory);
router.route('/:id').get(isAutherizedMiddleware,orderController.getOrder);
router.route('/processPayment').post(isAutherizedMiddleware,orderController.processPayment);

module.exports = router;