const categoryModel = require("../../models/categoryModel");
const productModel = require("../../models/productModel");
const reviewModel = require("../../models/reviewModel");
const queryProducts = require("../../utils/queryProducts");
const { responseReturn } = require("../../utils/response");
const moment = require("moment");

class homeControllers {
  formateProduct = (products) => {
    const productArray = [];
    let i = 0;
    while (i < products.length) {
      let temp = [];
      let j = i;
      while (j < i + 3) {
        if (products[j]) {
          temp.push(products[j]);
        }
        j++;
      }
      productArray.push([...temp]);
      i = j;
    }
    return productArray;
  };
  get_categorys = async (req, res) => {
    try {
      const categorys = await categoryModel.find({});
      responseReturn(res, 200, { categorys });
    } catch (error) {
      responseReturn(res, 501, { error: error.message });
    }
  };
  get_products = async (req, res) => {
    try {
      const products = await productModel
        .find({})
        .limit(16)
        .sort({ createdAt: -1 });
      const allProduct1 = await productModel
        .find({})
        .limit(9)
        .sort({ createdAt: -1 });
      const allProduct2 = await productModel
        .find({})
        .limit(9)
        .sort({ rating: -1 });
      const allProduct3 = await productModel
        .find({})
        .limit(9)
        .sort({ discount: -1 });
      const latest_product = this.formateProduct(allProduct1);
      const topRated_product = this.formateProduct(allProduct2);
      const discount_product = this.formateProduct(allProduct3);
      responseReturn(res, 200, {
        products,
        latest_product,
        topRated_product,
        discount_product,
      });
    } catch (error) {
      responseReturn(res, 501, { error: error.message });
    }
  };

  price_range_product = async (req, res) => {
    try {
      const priceRange = {
        low: 0,
        high: 0,
      };
      const products = await productModel
        .find({})
        .limit(9)
        .sort({ createdAt: -1 });
      const latest_product = this.formateProduct(products);
      const getForPrice = await productModel.find({}).sort({ price: 1 });
      if (getForPrice.length > 0) {
        priceRange.high = getForPrice[getForPrice.length - 1].price;
        priceRange.low = getForPrice[0].price;
      }
      responseReturn(res, 200, { latest_product, priceRange });
    } catch (error) {
      responseReturn(res, 501, { error: error.message });
    }
  };

  query_product = async (req, res) => {
    const perPage = 12;
    req.query.perPage = perPage;
    try {
      const products = await productModel.find({}).sort({ createdAt: -1 });

      const totalProduct = new queryProducts(products, req.query)
        .categoryQuery()
        .searchQuery()
        .priceQuery()
        .ratingQuery()
        .sortByPrice()
        .countProducts();

      const result = new queryProducts(products, req.query)
        .categoryQuery()
        .searchQuery()
        .ratingQuery()
        .priceQuery()
        .sortByPrice()
        .skip()
        .limit()
        .getProducts();

      responseReturn(res, 200, { products: result, totalProduct });
    } catch (error) {
      responseReturn(res, 501, { error: error.message });
    }
  };

  get_product_details = async (req, res) => {
    const { slug } = req.params;
    try {
      const product = await productModel.findOne({ slug });
      const relatedProducts = await productModel
        .find({
          $and: [
            {
              _id: {
                $ne: product.id,
              },
            },
            {
              category: {
                $eq: product.category,
              },
            },
          ],
        })
        .limit(20);
      const moreProducts = await productModel
        .find({
          $and: [
            {
              _id: {
                $ne: product.id,
              },
            },
            {
              sellerId: {
                $eq: product.sellerId,
              },
            },
          ],
        })
        .limit(3);
      responseReturn(res, 200, { product, relatedProducts, moreProducts });
    } catch (error) {
      responseReturn(res, 501, { error: error.message });
    }
  };

  submit_review = async (req, res) => {
    const { name, rating, review, productId } = req.body;
    try {
      await reviewModel.create({
        productId,
        name,
        rating,
        date: moment(Date.now()).format("LL"),
        review,
      });
      let rat = 0;
      const reviews = await reviewModel.find({ productId });
      for (let i = 0; i < reviews.length; i++) {
        rat += reviews[i].rating;
      }
      let productRating = 0;
      if (reviews.length) {
        productRating = (rat / reviews.length).toFixed(1);
      }
      await productModel.findByIdAndUpdate(productId, {
        rating: productRating,
      });
      responseReturn(res, 201, { message: "Review submitted" });
    } catch (error) {
      responseReturn(res, 501, { error: error.message });
    }
  };

  get_reviews = async (req, res) => {
    const { productId } = req.params;
    const { pageNum } = req.query;
    const limit=10;
    const skipPage= limit*(pageNum-1);
    try {
      let getRating= await reviewModel.aggregate([
        {
          $match:{
            productId:{
              $eq: new Object
            }
          }
        }
      ])
    } catch (error) {
      
    }
  };
}

module.exports = new homeControllers();
