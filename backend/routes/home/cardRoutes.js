const cardController = require("../../controllers/home/cardController");
const router = require("express").Router();

router.post("/home/product/add-to-card", cardController.add_to_card);
router.get(
  "/home/product/get-card-products/:userId",
  cardController.get_card_products
);
router.delete(
  "/home/product/delete-card-product/:card_id",
  cardController.delete_card_product
);

module.exports = router;
