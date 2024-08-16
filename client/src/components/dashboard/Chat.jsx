import React, { useEffect, useState } from "react";
import { AiOutlineMessage, AiOutlinePlus } from "react-icons/ai";
import { GrEmoji } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import {
  add_friend,
  messageClear,
  send_message,
  updateMessage,
} from "../../store/reducers/chatReducer";
import { toast } from "react-hot-toast";
import { useRef } from "react";
import { FaList } from "react-icons/fa6";

const socket = io("http://localhost:5000");

const Chat = () => {
  const scrollRef = useRef();
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const { sellerId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const { fd_messages, currentFd, my_friends, successMessage } = useSelector(
    (state) => state.chat
  );
  const [receiverMessage, setReceiverMessage] = useState("");
  const [activeSeller, setActiveSeller] = useState([]);
  useEffect(() => {
    socket.emit("add_user", userInfo.id, userInfo);
  }, []);
  useEffect(() => {
    dispatch(
      add_friend({
        sellerId: sellerId || "",
        userId: userInfo.id,
      })
    );
  }, [sellerId]);

  const send = () => {
    if (text) {
      dispatch(
        send_message({
          userId: userInfo.id,
          text,
          sellerId,
          name: userInfo.name,
        })
      );
      setText("");
    }
  };

  useEffect(() => {
    socket.on("seller_message", (msg) => {
      setReceiverMessage(msg);
    });
    socket.on("activeSeller", (sellers) => {
      setActiveSeller(sellers);
    });
  }, []);

  useEffect(() => {
    if (successMessage) {
      socket.emit("send_customer_message", fd_messages[fd_messages.length - 1]);
      dispatch(messageClear());
    }
  }, [successMessage]);

  useEffect(() => {
    if (receiverMessage) {
      if (
        sellerId === receiverMessage.senderId &&
        userInfo.id === receiverMessage.receiverId
      ) {
        dispatch(updateMessage(receiverMessage));
      } else {
        toast.success(receiverMessage.senderName + " send a message");
        dispatch(messageClear());
      }
    }
  }, [receiverMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [fd_messages]);

  const [show, setShow] = useState(false);
  return (
    <div className="bg-white p-3 rounded-md">
      <div className="w-full flex relative">
        <div
          className={`w-[230px] md-lg:absolute bg-white md-lg:h-full transition-all duration-300 ${
            show ? "left-0" : "left-[-350px]"
          }`}
        >
          <div className="flex justify-center gap-3 items-center text-slate-600 text-xl h-[50px]">
            <span>
              <AiOutlineMessage />
            </span>
            <span>Message</span>
          </div>

          <div className="w-full flex flex-col gap-6 text-slate-600 py-4 h-[400px] pr-3">
            {my_friends.map((f, i) => (
              <Link
                to={`/dashboard/chat/${f.fdId}`}
                key={i}
                className={`flex gap-2 justify-start items-center pl-2 py[5px]`}
              >
                <div className="w-[30px] h-[30px] rounded-full relative">
                  {activeSeller.some((c) => c.sellerId === f.fdId) && (
                    <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0"></div>
                  )}
                  <img src={f.image} alt="user" className=" rounded-full" />
                </div>
                <span className=" whitespace-nowrap">{f.name}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="w-[calc(100%-230px)] md-lg:w-full">
          {currentFd ? (
            <div className="w-full h-full">
              <div className="flex justify-between items-center text-slate-600 text-xl h-[50px]">
                <div className="flex justify-start gap-3 items-center">
                  <div className="w-[30px] h-[30px] rounded-full relative">
                    {activeSeller.some(
                      (c) => c.sellerId === currentFd.fdId
                    ) && (
                      <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0"></div>
                    )}
                    <img
                      src={currentFd.image}
                      alt="user"
                      className="rounded-full"
                    />
                  </div>
                  <span className=" whitespace-nowrap">{currentFd.name}</span>
                </div>
                <div
                  onClick={() => setShow(!show)}
                  className="w-[40px] h-[40px] cursor-pointer rounded-sm justify-center items-center bg-sky-600 text-white hidden md-lg:flex"
                >
                  <FaList />
                </div>
              </div>

              <div className="h-[400px] w-full bg-slate-100 p-3 rounded-md">
                <div className="w-full h-full overflow-y-auto flex flex-col gap-3">
                  {fd_messages.map((m, i) => {
                    if (currentFd?.fdId !== m.receiverId) {
                      return (
                        <div
                          key={i}
                          ref={scrollRef}
                          className="w-full flex gap-2 justify-start items-center text-[14px]"
                        >
                          <img
                            src={currentFd.image}
                            alt="user"
                            className="w-[30px] h-[30px] rounded-full"
                          />
                          <div className="p-2 bg-purple-500 text-white rounded-md">
                            <span>{m.message}</span>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={i}
                          ref={scrollRef}
                          className="w-full flex gap-2 justify-end items-center text-[14px]"
                        >
                          <div className="p-2 bg-cyan-500 text-white rounded-md">
                            <span>{m.message}</span>
                          </div>
                          <img
                            src="http://localhost:3000/images/user.png"
                            alt="user"
                            className="w-[30px] h-[30px]"
                          />
                        </div>
                      );
                    }
                  })}
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
                    onChange={(e) => setText(e.target.value)}
                    value={text}
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
                  <div onClick={send} className="text-2xl cursor-pointer">
                    <IoSend />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              onClick={() => setShow(true)}
              className="w-full flex justify-center items-center text-lg font-bold text-slate-600 h-[400px]"
            >
              <span className=" cursor-pointer">select seller</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
