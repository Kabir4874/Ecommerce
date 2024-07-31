const sellerCustomerMessageModel = require("../../models/chat/sellerCustomerMessageModel");
const sellerCustomerModel = require("../../models/chat/sellerCustomerModel");
const customerModel = require("../../models/customerModel");
const sellerModel = require("../../models/sellerModel");
const { responseReturn } = require("../../utils/response");

class chatController {
  add_customer_friend = async (req, res) => {
    const { sellerId, userId } = req.body;
    try {
      if (sellerId) {
        const seller = await sellerModel.findById(sellerId);
        const user = await customerModel.findById(userId);
        const checkSeller = await sellerCustomerModel.findOne({
          $and: [
            {
              myId: {
                $eq: userId,
              },
            },
            {
              myFriends: {
                $elemMatch: {
                  fdId: sellerId,
                },
              },
            },
          ],
        });
        if (!checkSeller) {
          await sellerCustomerModel.updateOne(
            {
              myId: userId,
            },
            {
              $push: {
                myFriends: {
                  fdId: sellerId,
                  name: seller.shopInfo?.shopName,
                  image: seller.image,
                },
              },
            }
          );
        }

        const checkCustomer = await sellerCustomerModel.findOne({
          $and: [
            {
              myId: {
                $eq: sellerId,
              },
            },
            {
              myFriends: {
                $elemMatch: {
                  fdId: userId,
                },
              },
            },
          ],
        });

        if (!checkCustomer) {
          await sellerCustomerModel.updateOne(
            {
              myId: sellerId,
            },
            {
              $push: {
                myFriends: {
                  fdId: userId,
                  name: user.name,
                  image: user?.image,
                },
              },
            }
          );
        }
        const messages = await sellerCustomerMessageModel.find({
          $or: [
            {
              $and: [
                {
                  receiverId: { $eq: sellerId },
                },
                {
                  senderId: { $eq: userId },
                },
              ],
            },
            {
              $and: [
                {
                  receiverId: { $eq: userId },
                },
                {
                  senderId: { $eq: sellerId },
                },
              ],
            },
          ],
        });
        const MyFriends = await sellerCustomerModel.findOne({
          myId: userId,
        });
        const currentFd = MyFriends.myFriends.find((s) => s.fdId === sellerId);
        responseReturn(res, 200, {
          myFriends: MyFriends.myFriends,
          currentFd,
          messages,
        });
      } else {
        const MyFriends = await sellerCustomerModel.findOne({ myId: userId });
        responseReturn(res, 200, { myFriends: MyFriends.myFriends });
      }
    } catch (error) {
      responseReturn(res, 501, { error: error.message });
    }
  };
}
module.exports = new chatController();
