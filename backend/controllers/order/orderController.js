const customerOrderModel = require("../../models/customerOrderModel");
const moment = require("moment");
const { responseReturn } = require("../../utils/response");
const authOrderModel = require("../../models/authOrderModel");
const cardModel = require("../../models/cardModel");
const {
  mongo: { ObjectId },
} = require("mongoose");
const myShopWalletModel = require("../../models/myShopWalletModel");
const sellerWalletModel = require("../../models/sellerWalletModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
class orderController {
  paymentCheck = async (id) => {
    try {
      const order = await customerOrderModel.findById(id);
      if (order.payment_status === "unpaid") {
        await customerOrderModel.findByIdAndUpdate(id, {
          delivery_status: "cancelled",
        });
        await authOrderModel.updateMany(
          { orderId: id },
          { delivery_status: "cancelled" }
        );
      }
      return true;
    } catch (error) {
      console.log(error.message);
    }
  };
  place_order = async (req, res) => {
    const { price, products, shipping_fee, shippingInfo, userId } = req.body;
    let authorOrderData = [];
    let cardId = [];
    const tempDate = moment(Date.now()).format("LLL");
    let customerORderProduct = [];
    for (let i = 0; i < products.length; i++) {
      const pro = products[i].products;
      for (let j = 0; j < pro.length; j++) {
        let tempCuspro = pro[j].productInfo;
        tempCuspro.quantity = pro[j].quantity;
        customerORderProduct.push(tempCuspro);
        if (pro[j]._id) {
          cardId.push(pro[j]._id);
        }
      }
    }
    try {
      const order = await customerOrderModel.create({
        customerId: userId,
        shippingInfo,
        products: customerORderProduct,
        price: price + shipping_fee,
        delivery_status: "pending",
        payment_status: "unpaid",
        date: tempDate,
      });
      for (let i = 0; i < products.length; i++) {
        const pro = products[i].products;
        const pri = products[i].price;
        const sellerId = products[i].sellerId;
        let storePro = [];
        for (let j = 0; j < pro.length; j++) {
          let tempPro = pro[j].productInfo;
          tempPro.quantity = pro[j].quantity;
          storePro.push(tempPro);
        }
        authorOrderData.push({
          orderId: order.id,
          sellerId,
          products: storePro,
          price: pri,
          payment_status: "unpaid",
          shippingInfo: "Dhaka MyShop Warehouse",
          delivery_status: "pending",
          date: tempDate,
        });
      }
      await authOrderModel.insertMany(authorOrderData);
      for (let k = 0; k < cardId.length; k++) {
        await cardModel.findByIdAndDelete(cardId[k]);
      }
      setTimeout(() => {
        this.paymentCheck(order.id);
      }, 5 * 60 * 1000);
      responseReturn(res, 201, {
        message: "Order Placed Successfully",
        orderId: order.id,
      });
    } catch (error) {
      responseReturn(res, 501, { error: error.message });
    }
  };
  get_customer_dashboard_data = async (req, res) => {
    const { userId } = req.params;
    try {
      const recentOrders = await customerOrderModel
        .find({
          customerId: new ObjectId(userId),
        })
        .limit(5);
      const pendingOrder = await customerOrderModel
        .find({
          customerId: new ObjectId(userId),
          delivery_status: "pending",
        })
        .countDocuments();
      const totalOrder = await customerOrderModel
        .find({
          customerId: new ObjectId(userId),
        })
        .countDocuments();
      const cancelledOrder = await customerOrderModel
        .find({
          customerId: new ObjectId(userId),
          delivery_status: "cancelled",
        })
        .countDocuments();
      responseReturn(res, 201, {
        recentOrders,
        pendingOrder,
        cancelledOrder,
        totalOrder,
      });
    } catch (error) {
      responseReturn(res, 501, { error: error.message });
    }
  };
  get_orders = async (req, res) => {
    const { customerId, status } = req.params;
    try {
      let orders = [];
      if (status !== "all") {
        orders = await customerOrderModel.find({
          customerId: new ObjectId(customerId),
          delivery_status: status,
        });
      } else {
        orders = await customerOrderModel.find({
          customerId: new ObjectId(customerId),
        });
      }
      responseReturn(res, 200, { orders });
    } catch (error) {
      responseReturn(res, 501, { error: error.message });
    }
  };

  get_order_details = async (req, res) => {
    const { orderId } = req.params;
    try {
      const order = await customerOrderModel.findById(orderId);
      responseReturn(res, 200, { order });
    } catch (error) {
      responseReturn(res, 501, { error: error.message });
    }
  };

  get_admin_orders = async (req, res) => {
    let { perPage, page, searchValue } = req.query;
    page = parseInt(page);
    perPage = parseInt(perPage);
    const skipPage = perPage * (page - 1);
    try {
      if (searchValue) {
      } else {
        const orders = await customerOrderModel
          .aggregate([
            {
              $lookup: {
                from: "authororders",
                localField: "_id",
                foreignField: "orderId",
                as: "subOrder",
              },
            },
          ])
          .skip(skipPage)
          .limit(perPage)
          .sort({ createdAt: -1 });

        const totalOrder = await customerOrderModel.aggregate([
          {
            $lookup: {
              from: "authororders",
              localField: "_id",
              foreignField: "orderId",
              as: "subOrder",
            },
          },
        ]);
        responseReturn(res, 200, { orders, totalOrder: totalOrder.length });
      }
    } catch (error) {
      responseReturn(res, 501, { error: error.message });
    }
  };

  get_admin_order = async (req, res) => {
    const { orderId } = req.params;
    try {
      const order = await customerOrderModel.aggregate([
        {
          $match: { _id: new ObjectId(orderId) },
        },
        {
          $lookup: {
            from: "authororders",
            localField: "_id",
            foreignField: "orderId",
            as: "subOrder",
          },
        },
      ]);
      responseReturn(res, 200, { order: order[0] });
    } catch (error) {
      responseReturn(res, 501, { error: error.message });
    }
  };

  admin_order_status_update = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
    try {
      await customerOrderModel.findByIdAndUpdate(orderId, {
        delivery_status: status,
      });
      responseReturn(res, 200, { message: "Order status updated" });
    } catch (error) {
      responseReturn(res, 501, { error: error.message });
    }
  };

  get_seller_orders = async (req, res) => {
    let { perPage, page, searchValue } = req.query;
    const { sellerId } = req.params;
    page = parseInt(page);
    perPage = parseInt(perPage);
    const skipPage = perPage * (page - 1);
    try {
      if (searchValue) {
      } else {
        const orders = await authOrderModel
          .find({ sellerId })
          .skip(skipPage)
          .limit(perPage)
          .sort({ createdAt: -1 });
        const totalOrder = await authOrderModel
          .find({ sellerId })
          .countDocuments();
        responseReturn(res, 200, { orders, totalOrder });
      }
    } catch (error) {
      responseReturn(res, 501, { error: error.message });
    }
  };

  get_seller_order = async (req, res) => {
    const { orderId } = req.params;
    try {
      const order = await authOrderModel.findById(orderId);
      responseReturn(res, 200, { order });
    } catch (error) {
      responseReturn(res, 501, { error: error.message });
    }
  };

  seller_order_status_update = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
    try {
      await authOrderModel.findByIdAndUpdate(orderId, {
        delivery_status: status,
      });
      responseReturn(res, 200, { message: "Order status updated" });
    } catch (error) {
      responseReturn(res, 501, { error: error.message });
    }
  };

  create_payment = async (req, res) => {
    const { price } = req.body;
    try {
      const payment = await stripe.paymentIntents.create({
        amount: price * 100,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });
      responseReturn(res, 200, { clientSecret: payment.client_secret });
    } catch (error) {
      responseReturn(res, 501, { error: error.message });
    }
  };

  order_confirm = async (req, res) => {
    const { orderId } = req.params;
    try {
      await customerOrderModel.findByIdAndUpdate(orderId, {
        payment_status: "paid",
        delivery_status: "pending",
      });
      await authOrderModel.updateMany(
        { orderId: new ObjectId(orderId) },
        {
          payment_status: "paid",
          delivery_status: "pending",
        }
      );
      const cuOrder = await customerOrderModel.findById(orderId);
      const auOrder = await authOrderModel.find({
        orderId: new ObjectId(orderId),
      });
      const time = moment(Date.now()).format("l");
      const splitTime = time.split("/");
      await myShopWalletModel.create({
        amount: cuOrder.price,
        month: splitTime[0],
        year: splitTime[2],
      });
      for (let i = 0; i < auOrder.length; i++) {
        await sellerWalletModel.create({
          sellerId: auOrder[i].sellerId.toString(),
          amount: auOrder[i].price,
          month: splitTime[0],
          year: splitTime[2],
        });
      }
      responseReturn(res, 200, { message: "Success" });
    } catch (error) {
      responseReturn(res, 501, { error: error.message });
    }
  };
}
module.exports = new orderController();
