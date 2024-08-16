const { formidable } = require("formidable");
const { responseReturn } = require("../utils/response");
const cloudinary = require("cloudinary").v2;
const productModel = require("../models/productModel");
const bannerModel = require("../models/bannerModel");
const {
  mongo: { ObjectId },
} = require("mongoose");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});
class bannerController {
  add_banner = async (req, res) => {
    const form = formidable({ multiples: true });
    form.parse(req, async (error, field, files) => {
      const { productId } = field;
      const { image } = files;
      try {
        const { slug } = await productModel.findById(productId[0]);
        const result = await cloudinary.uploader.upload(image[0].filepath, {
          folder: "banners",
          transformation: [{ quality: "auto:eco" }, { fetch_format: "auto" }],
        });
        const banner = await bannerModel.create({
          productId: productId[0],
          banner: result.url,
          link: slug,
        });
        responseReturn(res, 200, {
          message: "Banner added successfully",
          banner,
        });
      } catch (error) {
        responseReturn(res, 500, { error: error.message });
      }
    });
  };

  get_banner = async (req, res) => {
    const { productId } = req.params;
    try {
      const banner = await bannerModel.findOne({
        productId: new ObjectId(productId),
      });
      responseReturn(res, 200, { banner });
    } catch (error) {
      responseReturn(res, 501, { error: error.message });
    }
  };

  get_banners = async (req, res) => {
    try {
      const banners = await bannerModel.aggregate([
        {
          $sample: {
            size: 10,
          },
        },
      ]);
      responseReturn(res, 200, { banners });
    } catch (error) {
      responseReturn(res, 501, { error: error.message });
    }
  };

  update_banner = async (req, res) => {
    const { bannerId } = req.params;
    const form = formidable({});
    form.parse(req, async (error, _, files) => {
      const { image } = files;
      try {
        let banner = await bannerModel.findById(bannerId);
        let temp = banner.banner.split("/");
        temp = temp[temp.length - 1];
        const imageName = temp.split(".")[0];
        await cloudinary.uploader.destroy(`banners/${imageName}`);
        const { url } = await cloudinary.uploader.upload(image[0].filepath, {
          folder: "banners",
          transformation: [{ quality: "auto:eco" }, { fetch_format: "auto" }],
        });
        await bannerModel.findByIdAndUpdate(bannerId, {
          banner: url,
        });
        banner = await bannerModel.findById(bannerId);
        responseReturn(res, 200, {
          banner,
          message: "Banner updated successfully",
        });
      } catch (error) {
        responseReturn(res, 501, { error: error.message });
      }
    });
  };
}
module.exports = new bannerController();
