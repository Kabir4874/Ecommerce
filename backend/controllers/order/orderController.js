const customerOrderModel = require("../../models/customerOrderModel");
const moment = require("moment");
const { responseReturn } = require("../../utils/response");
const authOrderModel = require("../../models/authOrderModel");
const cardModel = require("../../models/cardModel");
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
}
module.exports = new orderController();
