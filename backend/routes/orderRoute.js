const express = require('express');
const { newOrder, getSingleOrderDetails, myOrders, getAllOrders, updateOrder, deleteOrder } = require('../controllers/orderController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

router.route('/order/new').post( newOrder);
router.route('/order/:id').get( getSingleOrderDetails);
router.route('/orders/me').get( myOrders);

router.route('/admin/orders').get(  getAllOrders);

router.route('/admin/order/:id')
    .put( updateOrder)
    .delete( deleteOrder);

module.exports = router;