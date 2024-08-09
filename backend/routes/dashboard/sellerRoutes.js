const router = require("express").Router();
const { authMiddleware } = require("../../middlewares/authMiddleware");
const sellerController = require("../../controllers/dashboard/sellerController");

router.get(
  "/request-seller-get",
  authMiddleware,
  sellerController.get_seller_request
);
router.get(
  "/get-seller/:sellerId",
  authMiddleware,
  sellerController.get_seller
);
router.post(
  "/seller-status-update",
  authMiddleware,
  sellerController.update_seller_status
);
router.get(
  "/get-active-sellers",
  authMiddleware,
  sellerController.get_active_sellers
);
router.get(
  "/get-inactive-sellers",
  authMiddleware,
  sellerController.get_inactive_sellers
);

module.exports = router;
