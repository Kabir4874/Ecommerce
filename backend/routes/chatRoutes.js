const chatController = require("../controllers/chat/chatController");

const router = require("express").Router();

router.post(
  "/chat/customer/add-customer-friend",
  chatController.add_customer_friend
);
router.post(
  "/chat/customer/send-message-to-seller",
  chatController.send_message_add
);
router.get("/chat/seller/get-customers/:sellerId", chatController.get_customers);

module.exports = router;
