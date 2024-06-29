import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BsImages } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { get_category } from "../../store/reducers/categoryReducer";
import { useDispatch, useSelector } from "react-redux";
import { get_product } from "../../store/reducers/productReducer";

const EditProduct = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { categorys } = useSelector((state) => state.category);
  const [state, setState] = useState({
    name: "",
    description: "",
    discount: "",
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

  useEffect(() => {
    dispatch(
      get_category({
        searchValue: "",
        perPage: "",
        page: "",
      })
    );
  }, []);

  useEffect(() => {
    dispatch(get_product(productId));
  }, [productId]);

  const [cateShow, setCateShow] = useState(false);
  const [category, setCategory] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setAllCategory(categorys);
  }, [categorys]);

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

  const changeImage = (img, files) => {
    if (files.length > 0) {
      console.log(img);
      console.log(files);
    }
  };

  useEffect(() => {
    setState({
      name: "T-shirt",
      description: "Best T-shirt",
      discount: 10,
      price: 455,
      brand: "Easy",
      stock: 10,
    });
    setCategory("Sports");
    setImageShow([
      "http://localhost:3000/images/admin.jpg",
      "http://localhost:3000/images/admin.jpg",
      "http://localhost:3000/images/admin.jpg",
    ]);
  }, []);

  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full p-4 bg-ebony_clay rounded-md">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-iron text-xl font-semibold">Edit Product</h1>
          <Link
            to={"/seller/dashboard/products"}
            className=" bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2"
          >
            All Products
          </Link>
        </div>

        <div>
          <form action="">
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
                <div key={i}>
                  <label htmlFor={i}>
                    <img src={img} alt="" />
                  </label>
                  <input
                    type="file"
                    id={i}
                    hidden
                    onChange={(e) => changeImage(img, e.target.files)}
                  />
                </div>
              ))}
            </div>
            <div className="flex">
              <button className=" bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-md px-7 py-2 my-2">
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
