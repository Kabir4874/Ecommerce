import React from "react";
import { AiOutlineMessage, AiOutlinePlus } from "react-icons/ai";
import { GrEmoji } from "react-icons/gr";
import { IoSend } from "react-icons/io5";

import { Link } from "react-router-dom";

const Chat = () => {
  return (
    <div className="bg-white p-3 rounded-md">
      <div className="w-full flex">
        <div className="w-[230px]">
          <div className="flex justify-center gap-3 items-center text-slate-600 text-xl h-[50px]">
            <span>
              <AiOutlineMessage />
            </span>
            <span>Message</span>
          </div>

          <div className="w-full flex flex-col gap-6 text-slate-600 py-4 h-[400px] pr-3">
            {[1, 2, 3, 4, 5, 6].map((f, i) => (
              <Link
                key={i}
                className={`flex gap-2 justify-start items-center pl-2 py[5px]`}
              >
                <div className="w-[30px] h-[30px] rounded-full relative">
                  <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0"></div>
                  <img src="http://localhost:3000/images/user.png" alt="user" />
                </div>
                <span className=" whitespace-nowrap">Kabir Ahmed</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="w-[calc(100%-230px)]">
          <div className="w-full h-full">
            <div className="flex justify-start gap-3 items-center text-slate-600 text-xl h-[50px]">
              <div className="w-[30px] h-[30px] rounded-full relative">
                <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0"></div>
                <img src="http://localhost:3000/images/user.png" alt="user" />
              </div>
              <span className=" whitespace-nowrap">Kabir Ahmed</span>
            </div>

            <div className="h-[400px] w-full bg-slate-100 p-3 rounded-md">
              <div className="w-full h-full overflow-y-auto flex flex-col gap-3">
                <div className="w-full flex gap-2 justify-start items-center text-[14px]">
                  <img
                    src="http://localhost:3000/images/user.png"
                    alt="user"
                    className="w-[30px] h-[30px]"
                  />
                  <div className="p-2 bg-purple-500 text-white rounded-md">
                    <span>How are you seller message</span>
                  </div>
                </div>

                <div className="w-full flex gap-2 justify-end items-center text-[14px]">
                  <div className="p-2 bg-purple-500 text-white rounded-md">
                    <span>How are you seller message</span>
                  </div>
                  <img
                    src="http://localhost:3000/images/user.png"
                    alt="user"
                    className="w-[30px] h-[30px]"
                  />
                </div>
              </div>
            </div>

            <div className="flex p-2 justify-between items-center w-full">
              <div className="w-[40px] h-[40px] border p-2 justify-center items-center flex rounded-full">
                <label htmlFor="add-file" className=" cursor-pointer">
                  <AiOutlinePlus />
                </label>
                <input type="file" className="hidden" id="add-file" />
              </div>
              <div className="border h-[40px] p-0 ml-2 w-[calc(100%-90px)] rounded-full relative flex">
                <input
                  type="text"
                  placeholder="enter message"
                  className="w-full rounded-full h-full outline-none p-3"
                />
                <div className="text-2xl right-2 top-2 absolute cursor-pointer">
                  <span>
                    <GrEmoji />
                  </span>
                </div>
              </div>
              <div className="w-[40px] p-2 justify-center items-center rounded-full">
                <div className="text-2xl cursor-pointer">
                  <IoSend />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
