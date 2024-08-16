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
            transformation: [{ quality: "auto:eco" }, { fetch_format: "auto" }],
          });
          allImageUrl = [...allImageUrl, result.url];
        }
        await productModel.create({
          sellerId: id,
          name,
          slug,
          shopName: shopName[0],
          category: category[0].trim(),
          description: description[0].trim(),
          stock: parseInt(stock[0]),
          price: parseInt(price[0]),
          discount: parseInt(discount[0]),
          images: allImageUrl,
          brand: brand[0].trim(),
        });
        responseReturn(res, 201, { message: "Product Added Successfully" });
      } catch (error) {
        responseReturn(res, 500, { error: error.message });
      }
    });
  };

  get_products = async (req, res) => {
    const { page, searchValue, perPage } = req.query;
    const { id } = req;
    const skipPage = perPage * (page - 1);
    try {
      if (searchValue) {
        const products = await productModel
          .find({
            $test: { $search: searchValue },
            sellerId: id,
          })
          .skip(skipPage)
          .limit(perPage)
          .sort({ createdAt: -1 });

        const totalProduct = await productModel
          .find({
            $text: { $search: searchValue },
            sellerId: id,
          })
          .countDocuments();
        responseReturn(res, 200, { totalProduct, products });
      } else {
        const products = await productModel
          .find({
            sellerId: id,
          })
          .skip(skipPage)
          .limit(perPage)
          .sort({ createdAt: -1 });

        const totalProduct = await productModel
          .find({
            sellerId: id,
          })
          .countDocuments();
        responseReturn(res, 200, { totalProduct, products });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  get_product = async (req, res) => {
    const { productId } = req.params;
    try {
      const product = await productModel.findById(productId);
      responseReturn(res, 200, { product });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  update_product = async (req, res) => {
    let {
      name,
      description,
      discount,
      stock,
      brand,
      price,
      category,
      productId,
    } = req.body;

    name = name.trim();
    const slug = name.split(" ").join("-");
    try {
      await productModel.findByIdAndUpdate(productId, {
        name,
        description,
        discount,
        stock,
        brand,
        price,
        category,
        productId,
        slug,
      });
      const product = await productModel.findById(productId);
      responseReturn(res, 200, {
        product,
        message: "Product Updated Successfully",
      });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  update_product_image = async (req, res) => {
    const form = formidable({ multiples: true });
    form.parse(req, async (error, fields, files) => {
      const { productId, oldImage } = fields;
      const { newImage } = files;
      if (error) {
        responseReturn(res, 404, { error: error.message });
      } else {
        try {
          const oldImagePublicId = oldImage[0].split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(`products/${oldImagePublicId}`);
          const result = await cloudinary.uploader.upload(
            newImage[0].filepath,
            {
              folder: "products",
              transformation: [
                { quality: "auto:eco" },
                { fetch_format: "auto" },
              ],
            }
          );
          if (result) {
            let { images } = await productModel.findById(productId[0]);
            const index = images.findIndex((img) => img === oldImage[0]);
            images[index] = result.url;
            await productModel.findByIdAndUpdate(productId[0], { images });

            const product = await productModel.findById(productId[0]);
            responseReturn(res, 200, {
              product,
              message: "Product Image Updated Successfully",
            });
          } else {
            responseReturn(res, 500, { error: "Image Update Failed" });
          }
        } catch (error) {
          responseReturn(res, 500, { error: error.message });
        }
      }
    });
  };
}
module.exports = new productController();
