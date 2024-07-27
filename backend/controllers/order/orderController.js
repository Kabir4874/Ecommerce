const customerOrderModel = require("../../models/customerOrderModel");
const moment = require("moment");
const { responseReturn } = require("../../utils/response");
const authOrderModel = require("../../models/authOrderModel");
const cardModel = require("../../models/cardModel");
const {
  mongo: { ObjectId },
} = require("mongoose");
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
}
module.exports = new orderController();
