import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  get_seller_message,
  messageClear,
  send_message_seller_admin,
  updateAdminMessage,
} from "../../store/reducers/chatReducer";
import { socket } from "../../utils/utils";

const SellerToAdmin = () => {
  const { seller_admin_message, successMessage } = useSelector(
    (state) => state.chat
  );
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  useEffect(() => {
    dispatch(get_seller_message());
  }, []);

  const send = (e) => {
    e.preventDefault();
    dispatch(
      send_message_seller_admin({
        senderId: userInfo._id,
        receiverId: "",
        message: text,
        senderName: userInfo.name,
      })
    );
  };

  useEffect(() => {
    socket.on("received_admin_message", (msg) => {
      dispatch(updateAdminMessage(msg));
    });
  }, []);

  useEffect(() => {
    if (successMessage) {
      socket.emit(
        "send_message_admin_to_seller",
        seller_admin_message[seller_admin_message.length - 1]
      );
      dispatch(messageClear());
    }
  }, [successMessage]);
  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full bg-ebony_clay px-4 py-4 rounded-md h-[calc(100vh-140px)]">
        <div className="flex w-full h-full relative">
          <div className="w-full">
            <div className="flex justify-between items-center">
              <div className="flex justify-start items-center gap-3">
                <div className="relative">
                  <img
                    src="http://localhost:3000/images/admin.jpg"
                    alt=""
                    className="w-[42px] h-[42px] border-green-500 border-2 max-w-[42px] p-[3px] rounded-full"
                  />
                  <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                </div>
                <h2 className="text-white font-semibold">Support</h2>
              </div>
            </div>

            <div className="py-4">
              <div className="bg-slate-800 h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto">
                {seller_admin_message.map((m, i) => {
                  if (userInfo._id !== m.senderId) {
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
                            <span>{m.message}</span>
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
                            <span>{m.message}</span>
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
                })}
              </div>
            </div>

            <form onSubmit={send} className="flex gap-3">
              <input
                onChange={(e) => setText(e.target.value)}
                value={text}
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

export default SellerToAdmin;
