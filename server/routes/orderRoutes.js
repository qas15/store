const Router = require('express');
const router = new Router();
const { createOrder, getAllOrders, deleteOrder } = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware'); // Импортируем middleware для авторизации


router.post('/create', authMiddleware, createOrder);
router.get('/', getAllOrders);
router.delete('/:id', deleteOrder);

module.exports = router;

