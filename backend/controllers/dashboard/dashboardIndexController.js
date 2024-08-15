const { responseReturn } = require("../../utils/response");
const authOrderModel = require("../../models/authOrderModel");
const customerOrderModel = require("../../models/customerOrderModel");
const sellerWalletModel = require("../../models/sellerWalletModel");
const myShopWalletModel = require("../../models/myShopWalletModel");
const sellerModel = require("../../models/sellerModel");
const productModel = require("../../models/productModel");
const adminSellerMessageModel = require("../../models/chat/adminSellerMessageModel");
const sellerCustomerMessageModel = require("../../models/chat/sellerCustomerMessageModel");
const {
  mongo: { ObjectId },
} = require("mongoose");
class dashboardIndexController {
  get_seller_dashboard_data = async (req, res) => {
    const { id } = req;
    try {
      const totalSale = await sellerWalletModel.aggregate([
        {
          $match: {
            sellerId: {
              $eq: id,
            },
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$amount" },
          },
        },
      ]);
      const totalProduct = await productModel
        .find({ sellerId: new ObjectId(id) })
        .countDocuments();
      const totalOrder = await authOrderModel
        .find({ sellerId: new ObjectId(id) })
        .countDocuments();
      const totalPendingOrder = await authOrderModel
        .find({
          $and: [
            {
              sellerId: {
                $eq: new ObjectId(id),
              },
            },
            {
              delivery_status: {
                $eq: "pending",
              },
            },
          ],
        })
        .countDocuments();
      const messages = await sellerCustomerMessageModel
        .find({
          $or: [
            {
              senderId: {
                $eq: id,
              },
            },
            {
              receiverId: {
                $eq: id,
              },
            },
          ],
        })
        .limit(3);
      const recentOrders = await authOrderModel
        .find({
          sellerId: new ObjectId(id),
        })
        .limit(5);
      responseReturn(res, 200, {
        totalOrder,
        totalSale: totalSale.length > 0 ? totalSale[0].totalAmount : 0,
        totalPendingOrder,
        messages,
        recentOrders,
        totalProduct,
      });
    } catch (error) {
      responseReturn(res, 501, { error: error.message });
    }
  };
  get_admin_dashboard_data = async (req, res) => {
    const { id } = req;
    try {
      const totalSale = await myShopWalletModel.aggregate([
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$amount" },
          },
        },
      ]);
      const totalProduct = await productModel.find({}).countDocuments();
      const totalOrder = await customerOrderModel.find({}).countDocuments();
      const totalSeller = await sellerModel.find({}).countDocuments();
      const messages = await adminSellerMessageModel.find({}).limit(3);
      const recentOrders = await customerOrderModel.find({}).limit(5);

      responseReturn(res, 200, {
        totalOrder,
        totalSale: totalSale.length > 0 ? totalSale[0].totalAmount : 0,
        recentOrders,
        messages,
        totalSeller,
        totalProduct,
      });
    } catch (error) {
      responseReturn(res, 501, { error: error.message });
    }
  };
}
module.exports = new dashboardIndexController();
