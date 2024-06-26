const categoryModel = require("../../models/categoryModel");
const { formidable } = require("formidable");
const { responseReturn } = require("../../utils/response");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

class categoryController {
  add_category = async (req, res) => {
    const form = formidable();
    form.parse(req, async (error, fields, files) => {
      if (error) {
        responseReturn(res, 404, { error: error.message });
      } else {
        let { name } = fields;
        let { image } = files;

        name = name[0].trim();
        const slug = name.split(" ").join("-");

        try {
          const result = await cloudinary.uploader.upload(image[0].filepath, {
            folder: "category",
          });
          if (result) {
            const category = await categoryModel.create({
              name,
              slug,
              image: result.url,
            });
            responseReturn(res, 201, {
              category,
              message: "Category Added Successfully",
            });
          } else {
            responseReturn(res, 404, { error: "Image Upload Failed" });
          }
        } catch (error) {
          responseReturn(res, 500, { error: error.message });
        }
      }
    });
  };

  get_category = async (req, res) => {
    console.log(req.body);
  };
}

module.exports = new categoryController();
