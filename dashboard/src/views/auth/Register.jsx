import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineGooglePlus } from "react-icons/ai";
import { FiFacebook } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";
import {
  messageClear,
  seller_register,
} from "../../store/reducers/authReducer";
import toast from "react-hot-toast";

const Register = () => {
  const dispatch = useDispatch();
  const { loader, errorMessage, successMessage } = useSelector(
    (state) => state.auth
  );
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const submit = (e) => {
    e.preventDefault();
    dispatch(seller_register(state));
  };
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [errorMessage, successMessage]);
  return (
    <div className=" min-w-screen min-h-screen bg-mirage flex justify-center items-center">
      <div className="w-[350px] text-iron p-2">
        <div className=" bg-ebony_clay p-4 rounded-md">
          <h2 className="text-xl mb-3">Welcome to E-commerce</h2>
          <p className="text-sm mb-3">
            Please register and start your business
          </p>
          <form action="" onSubmit={submit}>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="name">Name</label>
              <input
                className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-iron focus:border-indigo-500 overflow-hidden"
                type="text"
                name="name"
                placeholder="name"
                id="name"
                required
                onChange={inputHandle}
                value={state.name}
              />
            </div>

            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="email">Email</label>
              <input
                className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-iron focus:border-indigo-500 overflow-hidden"
                type="email"
                name="email"
                placeholder="email"
                id="email"
                required
                onChange={inputHandle}
                value={state.email}
              />
            </div>

            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="password">Password</label>
              <input
                className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-iron focus:border-indigo-500 overflow-hidden"
                type="password"
                name="password"
                placeholder="password"
                id="password"
                required
                onChange={inputHandle}
                value={state.password}
              />
            </div>

            <div className="flex items-center w-full gap-3 mb-3">
              <input
                className="w-4 h-4 text-blue-600 overflow-hidden bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
                type="checkbox"
                name="checkbox"
                id="checkbox"
                required
              />
              <label htmlFor="checkbox">
                I agree to privacy policy & terms
              </label>
            </div>
            <button
              disabled={loader ? true : false}
              className=" bg-blue-500 w-full hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3 transition-all duration-200"
            >
              {loader ? (
                <PropagateLoader color="#fff" cssOverride={overrideStyle} />
              ) : (
                "Register"
              )}
            </button>
            <div className="flex items-center justify-center mb-3 gap-3">
              <p>
                Already have an account?{" "}
                <Link to={"/login"} className=" underline">
                  Login Here
                </Link>
              </p>
            </div>
            <div className="w-full flex justify-center items-center mb-3">
              <div className="w-[45%] bg-slate-700 h-[1px]"></div>
              <div className="w-[10%] flex justify-center items-center">
                <span className="pb-1">Or</span>
              </div>
              <div className="w-[45%] bg-slate-700 h-[1px]"></div>
            </div>
            <div className="flex justify-center items-center gap-3">
              <div className="w-[35px] h-[35px] flex items-center justify-center rounded-md bg-orange-700 shadow-lg hover:shadow-orange-700/50 cursor-pointer overflow-hidden">
                <span>
                  <AiOutlineGooglePlus />
                </span>
              </div>
              <div className="w-[35px] h-[35px] flex items-center justify-center rounded-md bg-indigo-700 shadow-lg hover:shadow-indigo-700/50 cursor-pointer overflow-hidden">
                <span>
                  <FiFacebook />
                </span>
              </div>
              <div className="w-[35px] h-[35px] flex items-center justify-center rounded-md bg-cyan-700 shadow-lg hover:shadow-cyan-700/50 cursor-pointer overflow-hidden">
                <span>
                  <FaXTwitter />
                </span>
              </div>
              <div className="w-[35px] h-[35px] flex items-center justify-center rounded-md bg-purple-700 shadow-lg hover:shadow-purple-700/50 cursor-pointer overflow-hidden">
                <span>
                  <FaGithub />
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
