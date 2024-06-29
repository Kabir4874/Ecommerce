const { formidable } = require("formidable");
const { responseReturn } = require("../../utils/response");
const cloudinary = require("cloudinary").v2;
const productModel = require("../../models/productModel");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

class productController {
  add_product = async (req, res) => {
    const { id } = req;
    const form = formidable({ multiples: true });
    form.parse(req, async (error, fields, files) => {
      let {
        name,
        category,
        description,
        stock,
        price,
        discount,
        shopName,
        brand,
      } = fields;
      const { images } = files;
      name = name[0].trim();
      const slug = name.split(" ").join("-");
      try {
        let allImageUrl = [];
        for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.uploader.upload(images[i].filepath, {
            folder: "products",
          });
          allImageUrl = [...allImageUrl, result.url];
        }
        const product = await productModel.create({
          sellerId: id,
          name,
          slug,
          shopName: shopName[0],
          category: category[0].trim(),
          description: description[0].trim(),
          stock: parseInt(stock),
          price: parseInt(price),
          discount: parseInt(discount),
          images: allImageUrl,
          brand: brand[0].trim(),
        });
        responseReturn(res, 201, { message: "Product Added Successfully" });
      } catch (error) {
        responseReturn(res, 500, { error: error.message });
      }
    });
  };
  get_product = async (req, res) => {};
}
module.exports = new productController();
