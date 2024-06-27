const { formidable } = require("formidable");
const { responseReturn } = require("../../utils/response");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

class productController {
  add_product = async (req, res) => {
    const form = formidable({ multiples: true });
    form.parse(req, async (error, fields, files) => {
      console.log(files, fields);
    });
  };
  get_product = async (req, res) => {};
}
module.exports = new productController();
