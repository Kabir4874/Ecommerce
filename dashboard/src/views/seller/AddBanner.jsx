import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BiSolidCloudUpload } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import {
  add_banner,
  get_banner,
  messageClear,
  update_banner,
} from "../../store/reducers/bannerReducer";
import { toast } from "react-hot-toast";
import { overrideStyle } from "../../utils/utils";
import { PropagateLoader } from "react-spinners";
const AddBanner = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const { productId } = useParams();
  const [imageShow, setImageShow] = useState("");
  const [image, setImage] = useState("");
  const { loader, successMessage, errorMessage, banner } = useSelector(
    (state) => state.banner
  );
  const imageHandle = (e) => {
    const image = e.target.files;
    setImage(image[0]);
    setImageShow(URL.createObjectURL(image[0]));
  };
  const add = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("image", image);
    dispatch(add_banner(formData));
  };
  const update = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    dispatch(update_banner({ info: formData, bannerId: banner._id }));
  };
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      setImage("");
      setImageShow("");
    }
    if (errorMessage) {
      toast.error(errorMessage);
    }
    dispatch(messageClear());
  }, [successMessage, errorMessage]);

  useEffect(() => {
    dispatch(get_banner(productId));
  }, [productId]);
  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full p-4 bg-ebony_clay rounded-md">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-iron text-xl font-semibold">
            {banner ? "Update Banner" : "Add Banner"}
          </h1>
          <Link
            to={"/seller/dashboard/banners"}
            className=" bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2"
          >
            All Banners
          </Link>
        </div>
        {banner ? (
          <div>
            <form action="" onSubmit={update}>
              <div className="my-5 text-iron">
                <div className="mb-4">
                  <img
                    src={banner.banner}
                    alt="banner"
                    className=" w-full h-auto"
                  />
                </div>
                <label
                  htmlFor="image"
                  className="flex justify-center items-center flex-col h-[280px] cursor-pointer border border-dashed hover:border-indigo-500 w-full border-iron"
                >
                  <span>
                    <BiSolidCloudUpload size={40} />
                  </span>
                  <span>update banner image</span>
                </label>
                <input
                  required
                  onChange={imageHandle}
                  type="file"
                  id="image"
                  hidden
                />
              </div>
              {imageShow && (
                <div className="mb-4">
                  <img
                    src={imageShow}
                    alt="banner"
                    className=" w-full h-auto"
                  />
                </div>
              )}
              <button
                disabled={loader ? true : false}
                className=" bg-blue-500 w-[250px] hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3 transition-all duration-200"
              >
                {loader ? (
                  <PropagateLoader color="#fff" cssOverride={overrideStyle} />
                ) : (
                  "Update Banner"
                )}
              </button>
            </form>
          </div>
        ) : (
          <div>
            <form action="" onSubmit={add}>
              <div className="my-5 text-iron">
                <label
                  htmlFor="image"
                  className="flex justify-center items-center flex-col h-[280px] cursor-pointer border border-dashed hover:border-indigo-500 w-full border-iron"
                >
                  <span>
                    <BiSolidCloudUpload size={40} />
                  </span>
                  <span>select banner image</span>
                </label>
                <input
                  required
                  onChange={imageHandle}
                  type="file"
                  id="image"
                  hidden
                />
              </div>
              {imageShow && (
                <div className="mb-4">
                  <img
                    src={imageShow}
                    alt="banner"
                    className=" w-full h-auto"
                  />
                </div>
              )}
              <button
                disabled={loader ? true : false}
                className=" bg-blue-500 w-[250px] hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3 transition-all duration-200"
              >
                {loader ? (
                  <PropagateLoader color="#fff" cssOverride={overrideStyle} />
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddBanner;
