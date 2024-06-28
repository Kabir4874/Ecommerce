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
    const { page, searchValue, perPage } = req.query;
    const skipPage = perPage * (page - 1);

    try {
      if (searchValue && page && perPage) {
        const categorys = await categoryModel
          .find({
            $text: { $search: searchValue },
          })
          .skip(skipPage)
          .limit(perPage)
          .sort({ createdAt: -1 });

        const totalCategory = await categoryModel
          .find({
            $text: { $search: searchValue },
          })
          .countDocuments();
        responseReturn(res, 200, { totalCategory, categorys });
      } else if (searchValue === "" && page && perPage) {
        const categorys = await categoryModel
          .find({})
          .skip(skipPage)
          .limit(perPage)
          .sort({ createdAt: -1 });

        const totalCategory = await categoryModel.find({}).countDocuments();
        responseReturn(res, 200, { totalCategory, categorys });
      } else {
        const categorys = await categoryModel.find({}).sort({ createdAt: -1 });

        const totalCategory = await categoryModel.find({}).countDocuments();
        responseReturn(res, 200, { totalCategory, categorys });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
}

module.exports = new categoryController();
