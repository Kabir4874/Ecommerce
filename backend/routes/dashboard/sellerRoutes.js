const router = require("express").Router();
const { authMiddleware } = require("../../middlewares/authMiddleware");
const sellerController = require("../../controllers/dashboard/sellerController");

router.get("/request-seller-get", sellerController.get_seller_request);

module.exports = router;
