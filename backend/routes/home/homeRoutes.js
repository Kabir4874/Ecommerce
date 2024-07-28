const router = require("express").Router();
const homeControllers = require("../../controllers/home/homeControllers");

router.get("/get-categorys", homeControllers.get_categorys);
router.get("/get-products", homeControllers.get_products);
router.get("/price-range-latest-product", homeControllers.price_range_product);
router.get("/query-products", homeControllers.query_product);
router.get("/get-product-details/:slug", homeControllers.get_product_details);

module.exports = router;
