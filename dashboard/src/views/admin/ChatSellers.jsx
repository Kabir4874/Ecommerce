import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaList } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { get_sellers } from "../../store/reducers/chatReducer";
import { useParams } from "react-router-dom";
import { BsEmojiSmile } from "react-icons/bs";

const ChatSellers = () => {
  const dispatch = useDispatch();
  const { sellers, activeSeller } = useSelector((state) => state.chat);
  const [show, setShow] = useState(false);
  const { sellerId } = useParams();
  console.log(sellerId);

  useEffect(() => {
    dispatch(get_sellers());
  }, []);
  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full bg-ebony_clay px-4 py-4 rounded-md h-[calc(100vh-140px)]">
        <div className="flex w-full h-full relative">
          <div
            className={`w-[280px] h-full absolute z-10 ${
              show ? "-left-4" : "-left-[336px]"
            } md:left-0 md:relative transition-all`}
          >
            <div className="w-full h-[calc(100vh-177px)] bg-ebony_clay2 md:bg-transparent overflow-y-auto">
              <div className="flex text-xl justify-between items-center p-4 md:p-0 md:px-3 md:pb-3 text-white">
                <h2>Sellers</h2>
                <span
                  className=" block cursor-pointer md:hidden"
                  onClick={() => setShow(!show)}
                >
                  <IoMdClose />
                </span>
              </div>
              {sellers.map((s, i) => (
                <div
                  key={i}
                  className={`h-[60px] flex justify-start gap-2 items-center text-white px-2 py-2 rounded-sm cursor-pointer ${
                    sellerId === s._id
                  }`}
                >
                  <div className="relative">
                    <img
                      src={s.image}
                      alt="profile"
                      className="w-[38px] h-[38px] max-w-[38px] p-[2px] rounded-full"
                    />
                    {activeSeller.some((a) => a.sellerId === s._id) && (
                      <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                    )}
                  </div>
                  <div className="flex justify-center items-start flex-col w-full">
                    <div className="flex justify-between items-center w-full">
                      <h2 className=" font-semibold">{s.name}</h2>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full md:w-[calc(100%-200px)] md:pl-4">
            <div className="flex justify-between items-center">
              {sellerId && (
                <div className="flex justify-start items-center gap-3">
                  <div className="relative">
                    <img
                      src="http://localhost:3000/images/admin.jpg"
                      alt=""
                      className="w-[42px] h-[42px] max-w-[42px] rounded-full"
                    />
                    <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                  </div>
                </div>
              )}
              <div
                onClick={() => setShow(!show)}
                className="w-[35px] flex md:hidden h-[35px] rounded-sm bg-blue-500 shadow-lg hover:shadow-blue-500/50 justify-center cursor-pointer items-center text-white"
              >
                <span>
                  <FaList />
                </span>
              </div>
            </div>

            <div className="py-4">
              <div className="bg-slate-800 h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto">
                {sellerId ? (
                  [1, 2, 3, 4, 5, 6].map((m, i) => {
                    if (m.senderId === sellerId) {
                      return (
                        <div
                          key={i}
                          className="w-full flex justify-start items-center"
                        >
                          <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                            <div>
                              <img
                                src="http://localhost:3000/images/admin.jpg"
                                alt=""
                                className="w-[38px] h-[38px] border-white border-2 max-w-[38px] p-[2px] rounded-full"
                              />
                            </div>
                            <div className="flex justify-center items-start flex-col w-full bg-orange-500 text-white p-1 px-2 rounded-sm">
                              <span>How are you?</span>
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={i}
                          className="w-full flex justify-end items-center"
                        >
                          <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                            <div className="flex justify-center items-start flex-col w-full bg-blue-500 text-white p-1 px-2 rounded-sm">
                              <span>How are you?</span>
                            </div>
                            <div>
                              <img
                                src="http://localhost:3000/images/admin.jpg"
                                alt=""
                                className="w-[38px] h-[38px] border-white border-2 max-w-[38px] p-[2px] rounded-full"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })
                ) : (
                  <div className="w-full h-full flex justify-center items-center flex-col gap-2 text-white">
                    <span>
                      <BsEmojiSmile />
                    </span>
                    <span>Select Customer</span>
                  </div>
                )}
              </div>
            </div>

            <form className="flex gap-3">
              <input
                className="w-full flex justify-between px-2 border border-slate-700 items-center py-[5px] focus:border-blue-500 rounded-md outline-none bg-transparent text-iron"
                type="text"
                placeholder="input your message"
              />
              <button className=" bg-cyan-500 shadow-lg hover:shadow-cyan-500/50 font-semibold w-[75px] h-[35px] rounded-md text-white flex justify-center items-center">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSellers;
