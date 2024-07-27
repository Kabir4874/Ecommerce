const orderController = require("../../controllers/order/orderController");

const router = require("express").Router();

router.post("/order/place-order", orderController.place_order);
router.get("/customer/get-dashboard-data/:userId", orderController.get_customer_dashboard_data);
router.get("/customer/get-orders/:customerId/:status", orderController.get_orders);

module.exports = router;
