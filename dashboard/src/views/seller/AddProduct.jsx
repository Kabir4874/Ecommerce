import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsImages } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { get_category } from "../../store/reducers/categoryReducer";
import { add_product, messageClear } from "../../store/reducers/productReducer";
import { overrideStyle } from "../../utils/utils";
import { PropagateLoader } from "react-spinners";
import { toast } from "react-hot-toast";

const AddProduct = () => {
  const dispatch = useDispatch();
  const { categorys } = useSelector((state) => state.category);
  const { successMessage, errorMessage, loader } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(
      get_category({
        searchValue: "",
        perPage: "",
        page: "",
      })
    );
  }, []);
  const [state, setState] = useState({
    name: "",
    description: "",
    discount: 0,
    price: "",
    brand: "",
    stock: "",
  });
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const [cateShow, setCateShow] = useState(false);
  const [category, setCategory] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const categorySearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value) {
      let srcValue = allCategory.filter(
        (c) => c.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      setAllCategory(srcValue);
    } else {
      setAllCategory(categorys);
    }
  };

  const [images, setImages] = useState([]);
  const [imageShow, setImageShow] = useState([]);

  const imageHandle = (e) => {
    const files = e.target.files;
    const length = files.length;
    if (length > 0) {
      setImages([...images, ...files]);
      let imageUrl = [];

      for (let i = 0; i < length; i++) {
        imageUrl.push({ url: URL.createObjectURL(files[i]) });
      }
      setImageShow([...imageShow, ...imageUrl]);
    }
  };

  const changeImage = (img, index) => {
    if (img) {
      let tempUrl = imageShow;
      let tempImages = images;

      tempImages[index] = img;
      tempUrl[index] = { url: URL.createObjectURL(img) };
      setImageShow([...tempUrl]);
      setImages([...tempImages]);
    }
  };

  const removeImage = (i) => {
    const filterImage = images.filter((img, index) => index !== i);
    const filterImageUrl = imageShow.filter((img, index) => index !== i);
    setImages(filterImage);
    setImageShow(filterImageUrl);
  };

  useEffect(() => {
    setAllCategory(categorys);
  }, [categorys]);

  const add = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", state.name);
    formData.append("description", state.description);
    formData.append("price", state.price);
    formData.append("stock", state.stock);
    formData.append("brand", state.brand);
    formData.append("shopName", "Kabir Fashion");
    formData.append("discount", state.discount);
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    formData.append("category", category);
    dispatch(add_product(formData));
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setState({
        name: "",
        description: "",
        discount: "",
        price: "",
        brand: "",
        stock: "",
      });
      setImageShow([]);
      setImages([]);
      setCategory("");
      setCateShow("");
    }
  }, [successMessage, errorMessage]);

  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full p-4 bg-ebony_clay rounded-md">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-iron text-xl font-semibold">Add Product</h1>
          <Link
            to={"/seller/dashboard/products"}
            className=" bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2"
          >
            All Products
          </Link>
        </div>

        <div>
          <form action="" onSubmit={add}>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-iron">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="name">Product Name</label>
                <input
                  type="text"
                  placeholder="product name"
                  name="name"
                  id="name"
                  onChange={inputHandle}
                  value={state.name}
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-ebony_clay border border-slate-700 rounded-md text-iron"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="brand">Brand Name</label>
                <input
                  type="text"
                  placeholder="brand name"
                  name="brand"
                  id="brand"
                  onChange={inputHandle}
                  value={state.brand}
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-ebony_clay border border-slate-700 rounded-md text-iron"
                />
              </div>
            </div>

            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-iron">
              <div className="flex flex-col w-full gap-1 relative">
                <label htmlFor="category">Category</label>
                <input
                  readOnly
                  onClick={() => setCateShow(!cateShow)}
                  type="text"
                  placeholder="-- select category --"
                  name="category"
                  id="category"
                  onChange={inputHandle}
                  value={category}
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-ebony_clay border border-slate-700 rounded-md text-iron"
                />
                <div
                  className={`absolute top-[101%] bg-slate-800 w-full transition-all ${
                    cateShow ? "scale-100" : "scale-0"
                  }`}
                >
                  <div className="w-full px-4 py-2 fixed">
                    <input
                      onChange={categorySearch}
                      value={searchValue}
                      type="text"
                      placeholder="search"
                      className="px-3 py-1 w-full focus:border-indigo-500 outline-none bg-transparent border border-slate-700 rounded-md text-iron overflow-hidden"
                    />
                  </div>
                  <div className="pt-14"></div>
                  <div className="flex justify-start items-start flex-col h-[200px] overflow-y-scroll">
                    {allCategory.map((c, i) => (
                      <span
                        key={i}
                        onClick={() => {
                          setCateShow(false);
                          setCategory(c.name);
                          setSearchValue("");
                          setAllCategory(categorys);
                        }}
                        className={`px-4 py-2 hover:bg-indigo-500 hover:text-white w-full cursor-pointer ${
                          category === c.name && "bg-indigo-500"
                        }`}
                      >
                        {c.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="stock">Stock</label>
                <input
                  type="number"
                  placeholder="stock"
                  name="stock"
                  id="stock"
                  onChange={inputHandle}
                  value={state.stock}
                  min={0}
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-ebony_clay border border-slate-700 rounded-md text-iron"
                />
              </div>
            </div>

            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-iron">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  placeholder="price"
                  name="price"
                  id="price"
                  onChange={inputHandle}
                  value={state.price}
                  min={0}
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-ebony_clay border border-slate-700 rounded-md text-iron"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="discount">Discount</label>
                <input
                  type="number"
                  placeholder="%discount%"
                  name="discount"
                  id="discount"
                  onChange={inputHandle}
                  value={state.discount}
                  min={0}
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-ebony_clay border border-slate-700 rounded-md text-iron"
                />
              </div>
            </div>

            <div className="flex flex-col w-full gap-1 text-iron">
              <label htmlFor="description">Description</label>
              <textarea
                type="text"
                placeholder="description"
                name="description"
                id="description"
                onChange={inputHandle}
                value={state.description}
                rows={4}
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-ebony_clay border border-slate-700 rounded-md text-iron"
              ></textarea>
            </div>

            <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 gap-3 w-full text-iron my-5">
              {imageShow.map((img, i) => (
                <div className="h-[280px] relative" key={i}>
                  <label htmlFor={i}>
                    <img
                      src={img.url}
                      alt=""
                      className="w-full h-full rounded-sm cursor-pointer"
                    />
                  </label>
                  <input
                    type="file"
                    id={i}
                    hidden
                    onChange={(e) => changeImage(e.target.files[0], i)}
                  />
                  <span
                    onClick={() => removeImage(i)}
                    className="p-2 z-10 cursor-pointer bg-slate-700 hover:shadow-lg hover:shadow-slate-400/50 text-white absolute top-1 right-1 rounded-full"
                  >
                    <IoCloseSharp />
                  </span>
                </div>
              ))}
              <label
                htmlFor="image"
                className="flex justify-center items-center flex-col h-[280px] cursor-pointer border border-dashed hover:border-indigo-500 w-full border-iron"
              >
                <span>
                  <BsImages />
                </span>
                <span>select image</span>
              </label>
              <input
                type="file"
                id="image"
                hidden
                multiple
                onChange={imageHandle}
              />
            </div>
            <div className="flex">
              <button
                disabled={loader ? true : false}
                className=" bg-blue-500 w-[250px] hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3 transition-all duration-200"
              >
                {loader ? (
                  <PropagateLoader color="#fff" cssOverride={overrideStyle} />
                ) : (
                  "Add Product"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddProduct;
