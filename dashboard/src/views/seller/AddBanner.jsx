import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiSolidCloudUpload } from "react-icons/bi";
const AddBanner = () => {
  const [show, setShow] = useState(false);

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
              <input type="file" id="image" hidden />
            </div>

            <div className="w-full mb-4 relative">
              <div
                onClick={() => setShow(!show)}
                className="w-full h-[50px] rounded-md cursor-pointer border border-slate-700 flex justify-start items-center px-4 text-iron"
              >
                <span>select product</span>
              </div>
              {show && (
                <div className="w-full h-[300px] bg-slate-800 relative">
                  <div className="p-4">
                    <input
                      type="text"
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-transparent border border-slate-700 rounded-md text-iron w-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBanner;
