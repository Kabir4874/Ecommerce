const adminSellerMessageModel = require("../../models/chat/adminSellerMessageModel");
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

  send_message_add = async (req, res) => {
    const { userId, text, sellerId, name } = req.body;
    try {
      const message = await sellerCustomerMessageModel.create({
        senderId: userId,
        senderName: name,
        receiverId: sellerId,
        message: text,
      });
      const data = await sellerCustomerModel.findOne({ myId: userId });
      let myFriends = data.myFriends;
      let index = myFriends.findIndex((f) => f.fdId === sellerId);
      while (index > 0) {
        let temp = myFriends[index];
        myFriends[index] = myFriends[index - 1];
        myFriends[index - 1] = temp;
        index--;
      }
      await sellerCustomerModel.updateOne(
        {
          myId: userId,
        },
        {
          myFriends,
        }
      );

      const data1 = await sellerCustomerModel.findOne({ myId: sellerId });
      let myFriends1 = data1.myFriends;
      let index1 = myFriends1.findIndex((f) => f.fdId === userId);
      while (index1 > 0) {
        let temp1 = myFriends1[index1];
        myFriends1[index1] = myFriends1[index1 - 1];
        myFriends1[index1 - 1] = temp1;
        index1--;
      }

      await sellerCustomerModel.updateOne(
        {
          myId: sellerId,
        },
        {
          myFriends1,
        }
      );
      responseReturn(res, 201, { message });
    } catch (error) {
      responseReturn(res, 501, { error: error.message });
    }
  };

  get_customers = async (req, res) => {
    const { sellerId } = req.params;
    try {
      const data = await sellerCustomerModel.findOne({ myId: sellerId });
      responseReturn(res, 200, { customers: data.myFriends });
    } catch (error) {
      responseReturn(res, 501, { error: error.message });
    }
  };

  get_customer_message = async (req, res) => {
    const { customerId } = req.params;
    const { id } = req;
    try {
      const messages = await sellerCustomerMessageModel.find({
        $or: [
          {
            $and: [
              {
                receiverId: { $eq: customerId },
              },
              {
                senderId: { $eq: id },
              },
            ],
          },
          {
            $and: [
              {
                receiverId: { $eq: id },
              },
              {
                senderId: { $eq: customerId },
              },
            ],
          },
        ],
      });
      const currentCustomer = await customerModel.findById(customerId);
      responseReturn(res, 200, { messages, currentCustomer });
    } catch (error) {
      responseReturn(res, 501, { error: error.message });
    }
  };

  seller_message_add = async (req, res) => {
    const { senderId, text, receiverId, name } = req.body;
    try {
      const message = await sellerCustomerMessageModel.create({
        senderId: senderId,
        senderName: name,
        receiverId: receiverId,
        message: text,
      });
      const data = await sellerCustomerModel.findOne({ myId: senderId });
      let myFriends = data.myFriends;
      let index = myFriends.findIndex((f) => f.fdId === receiverId);
      while (index > 0) {
        let temp = myFriends[index];
        myFriends[index] = myFriends[index - 1];
        myFriends[index - 1] = temp;
        index--;
      }
      await sellerCustomerModel.updateOne(
        {
          myId: senderId,
        },
        {
          myFriends,
        }
      );

      const data1 = await sellerCustomerModel.findOne({ myId: receiverId });
      let myFriends1 = data1.myFriends;
      let index1 = myFriends1.findIndex((f) => f.fdId === senderId);
      while (index1 > 0) {
        let temp1 = myFriends1[index1];
        myFriends1[index1] = myFriends1[index1 - 1];
        myFriends1[index1 - 1] = temp1;
        index1--;
      }

      await sellerCustomerModel.updateOne(
        {
          myId: receiverId,
        },
        {
          myFriends1,
        }
      );
      responseReturn(res, 201, { message });
    } catch (error) {
      responseReturn(res, 501, { error: error.message });
    }
  };

  get_sellers = async (req, res) => {
    try {
      const sellers = await sellerModel.find({});
      responseReturn(res, 200, { sellers });
    } catch (error) {
      responseReturn(res, 501, { error: error.message });
    }
  };

  seller_admin_message_insert = async (req, res) => {
    const { senderId, receiverId, senderName, message } = req.body;
    try {
      const messageData = await adminSellerMessageModel.create({
        senderId,
        receiverId,
        senderName,
        message,
      });
      responseReturn(res, 200, { message: messageData });
    } catch (error) {
      responseReturn(res, 501, { error: error.message });
    }
  };

  get_admin_messages = async (req, res) => {
    const { receiverId } = req.params;
    const id = "";
    try {
      const messages = await adminSellerMessageModel.find({
        $or: [
          {
            $and: [
              {
                receiverId: { $eq: receiverId },
              },
              {
                senderId: {
                  $eq: id,
                },
              },
            ],
          },
          {
            $and: [
              {
                receiverId: { $eq: id },
              },
              {
                senderId: { $eq: receiverId },
              },
            ],
          },
        ],
      });
      let currentSeller = {};
      if (receiverId) {
        currentSeller = await sellerModel.findById(receiverId);
      }
      responseReturn(res, 200, { messages, currentSeller });
    } catch (error) {
      responseReturn(res, 501, { error: error.message });
    }
  };

  get_seller_messages = async (req, res) => {
    const receiverId = "";
    const { id } = req;
    try {
      const messages = await adminSellerMessageModel.find({
        $or: [
          {
            $and: [
              {
                receiverId: { $eq: receiverId },
              },
              {
                senderId: {
                  $eq: id,
                },
              },
            ],
          },
          {
            $and: [
              {
                receiverId: { $eq: id },
              },
              {
                senderId: { $eq: receiverId },
              },
            ],
          },
        ],
      });
      responseReturn(res, 200, { messages });
    } catch (error) {
      responseReturn(res, 501, { error: error.message });
    }
  };
}
module.exports = new chatController();
