import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { BsImage } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { overrideStyle } from "../../utils/utils";
import { PropagateLoader } from "react-spinners";
import {
  categoryAdd,
  messageClear,
  get_category,
} from "../../store/reducers/categoryReducer";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import Search from "../components/Search";

const Category = () => {
  const dispatch = useDispatch();
  const { loader, successMessage, errorMessage, categorys } = useSelector(
    (state) => state.category
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [show, setShow] = useState(false);
  const [imageShow, setImageShow] = useState("");
  const [state, setState] = useState({
    name: "",
    image: "",
  });

  const imageHandle = (e) => {
    let files = e.target.files;
    if (files.length > 0) {
      setImageShow(URL.createObjectURL(files[0]));
      setState({
        ...state,
        image: files[0],
      });
    }
  };

  const add_category = (e) => {
    e.preventDefault();
    dispatch(categoryAdd(state));
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
        image: "",
      });
      setImageShow("");
    }
  }, [successMessage, errorMessage]);

  useEffect(() => {
    const obj = {
      perPage: parseInt(perPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_category(obj));
  }, [searchValue, currentPage, perPage]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-ebony_clay rounded-md">
        <h1 className="text-iron font-semibold text-sm">Categories</h1>
        <button
          onClick={() => setShow(true)}
          className=" bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-4 py-2 cursor-pointer text-white rounded-sm text-sm"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap w-full">
        <div className="w-full lg:w-7/12">
          <div className="w-full p-4 bg-ebony_clay rounded-md">
            <Search
              setPerPage={setPerPage}
              setSearchValue={setSearchValue}
              searchValue={searchValue}
            />
            <div className=" relative overflow-x-auto mt-8">
              <table className="w-full text-sm text-left text-iron">
                <thead className="text-sm uppercase border-b border-slate-700">
                  <tr>
                    <th scope="col" className="py-1 px-4">
                      No.
                    </th>
                    <th scope="col" className="py-1 px-4">
                      Image
                    </th>
                    <th scope="col" className="py-1 px-4">
                      Name
                    </th>
                    <th scope="col" className="py-1 px-4">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categorys.map((d, i) => (
                    <tr key={i}>
                      <td className="py-3 px-4 font-medium whitespace-nowrap">
                        {i + 1}
                      </td>
                      <td className="py-3 px-4 font-medium whitespace-nowrap">
                        <img
                          src={d.image}
                          alt=""
                          className="w-[45px] h-[45px]"
                        />
                      </td>
                      <td className="py-3 px-4 font-medium whitespace-nowrap">
                        <span>{d.name}</span>
                      </td>
                      <td className="py-3 px-4 font-medium whitespace-nowrap">
                        <div className="flex justify-start items-center gap-4">
                          <Link className="p-[6px] bg-yellow-600 rounded hover:shadow-lg hover:shadow-yellow-600/50">
                            <FaEdit />
                          </Link>
                          <Link className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50">
                            <FaTrash />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="w-full flex justify-end mt-4 bottom-4 right-4">
              <Pagination
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                totalItem={20}
                perPage={perPage}
                showItem={4}
              />
            </div>
          </div>
        </div>
        <div
          className={`w-[320px] lg:w-5/12 translate-x-[100] lg:relative lg:right-0 fixed ${
            show ? "right-0" : "-right-[340px]"
          } z-50 top-0 transition-all duration-500`}
        >
          <div className="w-full pl-6">
            <div className=" bg-ebony_clay h-screen lg:h-auto px-3 py-2 lg:rounded-md text-iron">
              <div className="flex justify-between items-center mb-4">
                <h1 className=" text-iron font-semibold text-xl ">
                  Add Category
                </h1>
                <div
                  className="block lg:hidden cursor-pointer"
                  onClick={() => setShow(false)}
                >
                  <AiOutlineClose size={20} />
                </div>
              </div>
              <form action="" onSubmit={add_category}>
                <div className="flex flex-col w-full gap-2 mb-3">
                  <label htmlFor="name">Category Name</label>
                  <input
                    onChange={(e) =>
                      setState({ ...state, name: e.target.value })
                    }
                    value={state.name}
                    type="text"
                    placeholder="category name"
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-ebony_clay border border-slate-700 rounded-md text-iron"
                    id="name"
                    name="category_name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="image"
                    className="flex justify-center items-center flex-col h-[315px] cursor-pointer border border-dashed hover:border-indigo-500 w-full border-iron"
                  >
                    {imageShow ? (
                      <img src={imageShow} alt="" className="w-full h-full" />
                    ) : (
                      <>
                        <span>
                          <BsImage />
                        </span>
                        <span>Select Image</span>
                      </>
                    )}
                  </label>
                </div>
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="hidden"
                  onChange={imageHandle}
                  required
                />
                <div className="mt-4">
                  <button
                    disabled={loader ? true : false}
                    className=" bg-blue-500 w-full hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3 transition-all duration-200"
                  >
                    {loader ? (
                      <PropagateLoader
                        color="#fff"
                        cssOverride={overrideStyle}
                      />
                    ) : (
                      "Add Category"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
