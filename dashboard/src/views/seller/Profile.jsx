import React from "react";
import { BsImages } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { FadeLoader } from "react-spinners";

const Profile = () => {
  const image = true;
  const loader = false;
  const status = "active";
  const userInfo = true;
  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-6/12">
          <div className="w-full bg-ebony_clay rounded-md p-4 text-iron">
            <div className="flex justify-center items-center py-3">
              {image ? (
                <label
                  htmlFor="img"
                  className="h-[210px] w-[300px] relative cursor-pointer p-3 overflow-hidden"
                >
                  <img
                    src="http://localhost:3000/images/admin.jpg"
                    alt=""
                    className="w-full h-full"
                  />
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
              <input type="file" hidden id="img" />
            </div>

            <div className="px-0 md:px-5 py-2">
              <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md relative">
                <span className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer">
                  <FaEdit />
                </span>
                <div className="flex gap-2">
                  <span>Name: </span>
                  <span>Kabir Ahmed Ridoy</span>
                </div>
                <div className="flex gap-2">
                  <span>Email: </span>
                  <span>kabir@gmail.com</span>
                </div>
                <div className="flex gap-2">
                  <span>Role: </span>
                  <span>seller</span>
                </div>
                <div className="flex gap-2">
                  <span>Status: </span>
                  <span>active</span>
                </div>
                <div className="flex gap-2">
                  <span>Payment Account: </span>
                  <p>
                    {status === "active" ? (
                      <span className="bg-green-500 text-white text-xs cursor-pointer ml-2 px-2 py-0.5 rounded">
                        pending
                      </span>
                    ) : (
                      <span className="bg-blue-500 text-white text-xs cursor-pointer ml-2 px-2 py-0.5 rounded">
                        click active
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {userInfo ? (
                <form
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
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-ebony_clay border border-slate-700 rounded-md text-iron"
                    />
                  </div>
                  <button className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-md px-7 py-2 my-2 w-fit">
                    Submit
                  </button>
                </form>
              ) : (
                <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md relative mt-4">
                  <span className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer">
                    <FaEdit />
                  </span>
                  <div className="flex gap-2">
                    <span>Shop Name: </span>
                    <span>Fashion Phoenix</span>
                  </div>
                  <div className="flex gap-2">
                    <span>Division: </span>
                    <span>Rajshahi</span>
                  </div>
                  <div className="flex gap-2">
                    <span>District: </span>
                    <span>Rajshahi</span>
                  </div>
                  <div className="flex gap-2">
                    <span>Sub District: </span>
                    <span>Rajshahi</span>
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
