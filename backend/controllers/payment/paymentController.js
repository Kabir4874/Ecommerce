const { v4: uuidv4 } = require("uuid");
const stripeModel = require("../../models/stripeModel");
const stripe = require("stripe")(
  "sk_test_51PmF6FIR1dQbKMRJUfCJvOqkFazTL5fAL4urVZCapGqogGZlP5sLUrBydQmmEWpzUKH9gNPcEcLhd1RyGkhVz2ua0005LfC882"
);
const { responseReturn } = require("../utils/response");
class paymentController {
  create_stripe_connect_account = async (req, res) => {
    const { id } = req;
    const uid = uuidv4();
    try {
      const stripeInfo = await stripeModel.findOne({ sellerId: id });
      if (stripeInfo) {
        await stripeModel.deleteOne({ sellerId: id });
        const account = await stripe.accounts.create({ type: "express" });
        const accountLink = await stripe.accountLink.create({
          account: account.id,
          refresh_url: "http://localhost:3000/refresh",
          return_url: `http://localhost:3000/success?activeCode=${uid}`,
          type: "account_onboarding",
        });
        await stripeModel.create({
          sellerId: id,
          stripeId: account.id,
          code: uid,
        });
        responseReturn(res, 201, { url: accountLink.url });
      } else {
        const account = await stripe.accounts.create({ type: "express" });
        const accountLink = await stripe.accountLink.create({
          account: account.id,
          refresh_url: "http://localhost:3000/refresh",
          return_url: `http://localhost:3000/success?activeCode=${uid}`,
          type: "account_onboarding",
        });
        await stripeModel.create({
          sellerId: id,
          stripeId: account.id,
          code: uid,
        });
        responseReturn(res, 201, { url: accountLink.url });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
}
module.exports = new paymentController();
