const router = require("express").Router();
const { authMiddleware } = require("../../middlewares/authMiddleware");
const productController = require("../../controllers/dashboard/productController");

router.post("/product-add", authMiddleware, productController.add_product);
router.get("/products-get", authMiddleware, productController.get_products);
router.get(
  "/product-get/:productId",
  authMiddleware,
  productController.get_product
);

module.exports = router;
