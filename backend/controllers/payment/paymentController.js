const { v4: uuidv4 } = require("uuid");
const stripeModel = require("../../models/stripeModel");
const sellerModel = require("../../models/sellerModel");
const sellerWalletModel = require("../../models/sellerWalletModel");
const myShopWalletModel = require("../../models/myShopWalletModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { responseReturn } = require("../../utils/response");
const withdrawRequestModel = require("../../models/withdrawRequestModel");
const {
  mongo: { ObjectId },
} = require("mongoose");

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

  active_stripe_connect_account = async (req, res) => {
    const { activeCode } = req.params;
    const { id } = req;
    try {
      const userStripeInfo = await stripeModel.findOne({
        code: activeCode,
      });
      if (userStripeInfo) {
        await sellerModel.findByIdAndUpdate(id, { payment: "active" });
        responseReturn(res, 200, { message: "Payment Activated" });
      } else {
        responseReturn(res, 501, { error: "Payment Active Failed" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  sumAmount = (data) => {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i].amount;
    }
    return sum;
  };

  get_seller_payment_details = async (req, res) => {
    const { sellerId } = req.params;
    try {
      const payments = await sellerWalletModel.find({ sellerId });
      const pendingWithdraws = await withdrawRequestModel.find({
        $and: [
          {
            sellerId: {
              $eq: sellerId,
            },
          },
          {
            status: {
              $eq: "pending",
            },
          },
        ],
      });
      const successWithdraws = await withdrawRequestModel.find({
        $and: [
          {
            sellerId: {
              $eq: sellerId,
            },
          },
          {
            status: {
              $eq: "success",
            },
          },
        ],
      });
      const pendingAmount = this.sumAmount(pendingWithdraws);
      const withdrawalAmount = this.sumAmount(successWithdraws);
      const totalAmount = this.sumAmount(payments);
      let availableAmount = 0;

      if (totalAmount > 0) {
        availableAmount = totalAmount - (pendingAmount + withdrawalAmount);
      }
      responseReturn(res, 200, {
        totalAmount,
        pendingAmount,
        withdrawalAmount,
        availableAmount,
        successWithdraws,
        pendingWithdraws,
      });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  withdrawal_request = async (req, res) => {
    const { sellerId, amount } = req.body;
    try {
      const withdrawal = await withdrawRequestModel.create({
        sellerId,
        amount,
      });
      responseReturn(res, 200, {
        withdrawal,
        message: "Withdrawal request sent",
      });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
  get_payment_request = async (req, res) => {
    try {
      const withdrawalRequest = await withdrawRequestModel.find({
        status: "pending",
      });
      responseReturn(res, 200, { withdrawalRequest });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
  payment_request_confirm = async (req, res) => {
    const { paymentId } = req.body;
    try {
      const payment = await withdrawRequestModel.findById(paymentId);
      const { stripeId } = await stripeModel.findOne({
        sellerId: new ObjectId(payment.sellerId),
      });
      await stripe.transfers.create({
        amount: payment.amount * 100,
        currency: "usd",
        destination: stripeId,
      });
      await withdrawRequestModel.findByIdAndUpdate(paymentId, {
        status: "success",
      });
      responseReturn(res, 200, { payment, message: "Payment Success" });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
}

module.exports = new paymentController();
