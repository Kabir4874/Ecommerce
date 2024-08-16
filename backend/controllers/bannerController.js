const { formidable } = require("formidable");
const { responseReturn } = require("../utils/response");
const cloudinary = require("cloudinary").v2;
const productModel = require("../models/productModel");
const bannerModel = require("../models/bannerModel");

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
          banner,
          message: "Banner added successfully",
        });
      } catch (error) {
        responseReturn(res, 500, { error: error.message });
      }
    });
  };
}
module.exports = new bannerController();
