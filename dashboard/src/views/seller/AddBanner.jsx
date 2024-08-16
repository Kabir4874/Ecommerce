import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BiSolidCloudUpload } from "react-icons/bi";
const AddBanner = () => {
  const [show, setShow] = useState(false);
  const { productId } = useParams();
  const [imageShow, setImageShow] = useState("");
  const [banner, setBanner] = useState("");
  const imageHandle = (e) => {
    const image = e.target.files;
    setBanner(image[0]);
    setImageShow(URL.createObjectURL(image[0]));
  };
  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full p-4 bg-ebony_clay rounded-md">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-iron text-xl font-semibold">Add Banner</h1>
          <Link
            to={"/seller/dashboard/banners"}
            className=" bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2"
          >
            All Banners
          </Link>
        </div>
        <div>
          <form action="">
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
              <input onChange={imageHandle} type="file" id="image" hidden />
            </div>
            {imageShow && (
              <div>
                <img src={imageShow} alt="banner" />
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBanner;
