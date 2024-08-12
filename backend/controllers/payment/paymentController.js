const { v4: uuidv4 } = require("uuid");
const stripeModel = require("../../models/stripeModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { responseReturn } = require("../../utils/response");

class paymentController {
  create_stripe_connect_account = async (req, res) => {
    const { id } = req;
    const uid = uuidv4();
    try {
      const stripeInfo = await stripeModel.findOne({ sellerId: id });

      if (stripeInfo) {
        await stripeModel.deleteOne({ sellerId: id });
        const account = await stripe.accounts.create({ type: "express" });
        console.log(account);
        const accountLink = await stripe.accountLinks.create({
          account: account.id,
          refresh_url: "http://localhost:3001/refresh",
          return_url: `http://localhost:3001/success?activeCode=${uid}`,
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
        console.log(account);
        const accountLink = await stripe.accountLinks.create({
          account: account.id,
          refresh_url: "http://localhost:3001/refresh",
          return_url: `http://localhost:3001/success?activeCode=${uid}`,
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

  active_stripe_connect_account= async(req,res)=>{
    const {activeCode}=req.params
    console.log(req.params);
  }
}

module.exports = new paymentController();
