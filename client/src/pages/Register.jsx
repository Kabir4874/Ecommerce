import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaFacebookF } from "react-icons/fa6";
import { AiOutlineGoogle } from "react-icons/ai";
import { Link } from "react-router-dom";

const Register = () => {
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
  const register = (e) => {
    e.preventDefault();
    console.log(state);
  };
  return (
    <div>
      <Header />
      <div className="bg-slate-200 mt-4">
        <div className="w-full justify-center items-center p-10 flex">
          <div className="grid grid-cols-2 w-[60%] mx-auto bg-white rounded-md">
            <div className="p-8">
              <h2 className="text-center w-full text-xl text-slate-600 font-bold">
                Register
              </h2>
              <div>
                <form action="" onSubmit={register} className="text-slate-600">
                  <div className="flex flex-col gap-1 mb-2">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="name"
                      onChange={inputHandle}
                      value={state.name}
                      className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col gap-1 mb-2">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="email"
                      onChange={inputHandle}
                      value={state.email}
                      className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col gap-1 mb-4">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="password"
                      onChange={inputHandle}
                      value={state.password}
                      className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md"
                    />
                  </div>
                  <button className="px-8 w-full py-2 bg-purple-500 shadow-lg hover:shadow-indigo-500/30 text-white rounded-md">
                    Register
                  </button>
                </form>
                <div className="flex justify-center items-center py-2">
                  <div className="h-[1px] bg-slate-300 w-[95%]"></div>
                  <span className="px-3 text-slate-600">or</span>
                  <div className="h-[1px] bg-slate-300 w-[95%]"></div>
                </div>
                <button className="px-8 w-full py-2 bg-indigo-500 shadow hover:shadow-indigo-500/20 text-white rounded-md flex justify-center items-center gap-2 mb-3">
                  <span>
                    <FaFacebookF />
                  </span>
                  <span>Login with Facebook</span>
                </button>
                <button className="px-8 w-full py-2 bg-orange-500 shadow hover:shadow-orange-500/20 text-white rounded-md flex justify-center items-center gap-2 mb-3">
                  <span>
                    <AiOutlineGoogle />
                  </span>
                  <span>Login with Facebook</span>
                </button>
              </div>
              <div className="text-center text-slate-600 pt-1">
                <p>
                  Already have an account?{" "}
                  <Link to={"/login"} className="text-blue-500 underline">
                    Login Now
                  </Link>{" "}
                </p>
              </div>
            </div>
            <div className="w-full h-full py-4 pr-4">
              <img
                src="http://localhost:3000/images/login.jpg"
                alt="login_image"
                className="w-full h-[95%]"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;