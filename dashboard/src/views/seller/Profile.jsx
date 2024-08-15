import React, { useEffect, useState } from "react";
import { BsImages } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { FadeLoader } from "react-spinners";
import { useSelector, useDispatch } from "react-redux";
import {
  profile_image_upload,
  messageClear,
  profile_info_add,
} from "../../store/reducers/authReducer";
import { toast } from "react-hot-toast";
import { overrideStyle } from "../../utils/utils";
import { PropagateLoader } from "react-spinners";
import { create_stripe_connect_account } from "../../store/reducers/sellerReducer";

const Profile = () => {
  const dispatch = useDispatch();
  const { userInfo, loader, successMessage, errorMessage } = useSelector(
    (state) => state.auth
  );

  const [state, setState] = useState({
    division: "",
    district: "",
    subDistrict: "",
    shopName: "",
  });

  const add_image = (e) => {
    if (e.target.files.length > 0) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      dispatch(profile_image_upload(formData));
    }
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const add = (e) => {
    e.preventDefault();
    dispatch(profile_info_add(state));
  };

  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-6/12">
          <div className="w-full bg-ebony_clay rounded-md p-4 text-iron">
            <div className="flex justify-center items-center py-3">
              {userInfo?.image ? (
                <label
                  htmlFor="img"
                  className="h-[210px] w-[300px] relative cursor-pointer p-3 overflow-hidden"
                >
                  <img src={userInfo.image} alt="" className="w-full h-full" />
                  {loader && (
                    <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              ) : (
                <label
                  htmlFor="img"
                  className="flex justify-center items-center flex-col h-[210px] w-[300px] cursor-pointer border border-dashed hover:border-indigo-500 border-iron relative"
                >
                  <span>
                    <BsImages />
                  </span>
                  <span>Select Image</span>
                  {loader && (
                    <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              )}
              <input type="file" hidden id="img" onChange={add_image} />
            </div>

            <div className="px-0 md:px-5 py-2">
              <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md relative">
                <span className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer">
                  <FaEdit />
                </span>
                <div className="flex gap-2">
                  <span>Name: </span>
                  <span>{userInfo.name}</span>
                </div>
                <div className="flex gap-2">
                  <span>Email: </span>
                  <span>{userInfo.email}</span>
                </div>
                <div className="flex gap-2">
                  <span>Role: </span>
                  <span>{userInfo.role}</span>
                </div>
                <div className="flex gap-2">
                  <span>Status: </span>
                  <span>{userInfo.status}</span>
                </div>
                <div className="flex gap-2">
                  <span>Payment Account: </span>
                  <p>
                    {userInfo?.payment === "active" ? (
                      <span className="bg-green-500 text-white select-none text-xs ml-2 px-2 py-0.5 rounded">
                        {userInfo.payment}
                      </span>
                    ) : (
                      <span
                        onClick={() =>
                          dispatch(create_stripe_connect_account())
                        }
                        className="bg-red-500 text-white text-xs cursor-pointer ml-2 px-2 py-0.5 rounded"
                      >
                        click active
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {!userInfo?.shopInfo ? (
                <form
                  onSubmit={add}
                  action=""
                  className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md relative mt-4"
                >
                  <div className="flex flex-col w-full gap-1 mb-3">
                    <label htmlFor="shopName">Shop Name</label>
                    <input
                      type="text"
                      placeholder="shop name"
                      id="shopName"
                      name="shopName"
                      value={state.shopName}
                      onChange={inputHandle}
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-ebony_clay border border-slate-700 rounded-md text-iron"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-1">
                    <label htmlFor="division">Division</label>
                    <input
                      type="text"
                      placeholder="division"
                      id="division"
                      name="division"
                      value={state.division}
                      onChange={inputHandle}
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-ebony_clay border border-slate-700 rounded-md text-iron"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-1 mb-3">
                    <label htmlFor="district">District</label>
                    <input
                      type="text"
                      placeholder="district"
                      id="district"
                      name="district"
                      value={state.district}
                      onChange={inputHandle}
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-ebony_clay border border-slate-700 rounded-md text-iron"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-1 mb-3">
                    <label htmlFor="subDistrict">Sub District</label>
                    <input
                      type="text"
                      placeholder="sub district"
                      id="subDistrict"
                      name="subDistrict"
                      value={state.subDistrict}
                      onChange={inputHandle}
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-ebony_clay border border-slate-700 rounded-md text-iron"
                    />
                  </div>
                  <div className="flex">
                    <button
                      disabled={loader ? true : false}
                      className=" bg-blue-500 w-[200px] hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3 transition-all duration-200"
                    >
                      {loader ? (
                        <PropagateLoader
                          color="#fff"
                          cssOverride={overrideStyle}
                        />
                      ) : (
                        "Update Info"
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md relative mt-4">
                  <span className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer">
                    <FaEdit />
                  </span>
                  <div className="flex gap-2">
                    <span>Shop Name: </span>
                    <span>{userInfo.shopInfo.shopName}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>Division: </span>
                    <span>{userInfo.shopInfo.division}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>District: </span>
                    <span>{userInfo.shopInfo.district}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>Sub District: </span>
                    <span>{userInfo.shopInfo.subDistrict}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full md:w-6/12">
          <div className="w-full p-4  pl-0 md:pl-7 mt-6 md:mt-0">
            <div className="bg-ebony_clay rounded-md text-iron">
              <form
                action=""
                className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md relative mt-4"
              >
                <h1 className="text-iron text-lg mb-3 font-semibold">
                  Change Password
                </h1>
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    placeholder="email"
                    id="email"
                    name="email"
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-ebony_clay border border-slate-700 rounded-md text-iron"
                  />
                </div>
                <div className="flex flex-col w-full gap-1">
                  <label htmlFor="oldPassword">Old Password</label>
                  <input
                    type="password"
                    placeholder="old password"
                    id="oldPassword"
                    name="oldPassword"
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-ebony_clay border border-slate-700 rounded-md text-iron"
                  />
                </div>
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    placeholder="new password"
                    id="newPassword"
                    name="newPassword"
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-ebony_clay border border-slate-700 rounded-md text-iron"
                  />
                </div>
                <button className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-md px-7 py-2 my-2 w-fit">
                  Update Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
