import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLocation, Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Shipping = () => {
  //   const { state } = useLocation();
  const [res, setRes] = useState(false);
  const [state, setState] = useState({
    name: "",
    address: "",
    phone: "",
    post: "",
    province: "",
    city: "",
    area: "",
  });
  const inputHandle = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const save = (e) => {
    e.preventDefault();
    const { name, address, phone, post, province, city, area } = state;
    if (name && address && phone && post && province && city && area) {
      setRes(true);
    }
  };
  return (
    <div>
      <Header />
      <section className='bg-[url("http://localhost:3000/images/banner/order.jpg")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
        <div className="absolute left-0 top-0 w-full h-full bg-raisin_black">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
              <h2 className="text-3xl font-bold">Shop.my</h2>
              <div className="flex justify-center items-center gap-2 text-2xl w-full">
                <Link to={"/"}>Home</Link>
                <span className="pt-2">
                  <MdOutlineKeyboardArrowRight />
                </span>
                <span>Place Order</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className=" bg-gallery">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16">
          <div className="w-full flex flex-wrap">
            <div className="w-[67%] md-lg:w-full">
              <div className="flex flex-col gap-3">
                <div className="bg-white p-6 shadow-sm rounded-md">
                  {!res && (
                    <>
                      <h2 className="text-slate-600 font-bold pb-3">
                        Shipping Information
                      </h2>
                      <form action="" onSubmit={save}>
                        <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="name">Name</label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              placeholder="name"
                              onChange={inputHandle}
                              value={state.name}
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md"
                            />
                          </div>
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="address">Address</label>
                            <input
                              type="text"
                              name="address"
                              id="address"
                              onChange={inputHandle}
                              value={state.address}
                              placeholder="House no/building/street/area"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md"
                            />
                          </div>
                        </div>
                        <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="phone">Phone</label>
                            <input
                              type="text"
                              name="phone"
                              id="phone"
                              placeholder="phone"
                              onChange={inputHandle}
                              value={state.phone}
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md"
                            />
                          </div>
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="post">Post</label>
                            <input
                              type="text"
                              name="post"
                              id="post"
                              placeholder="post"
                              onChange={inputHandle}
                              value={state.post}
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md"
                            />
                          </div>
                        </div>
                        <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="province">Province</label>
                            <input
                              type="text"
                              name="province"
                              id="province"
                              placeholder="province"
                              onChange={inputHandle}
                              value={state.province}
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md"
                            />
                          </div>
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="city">City</label>
                            <input
                              type="text"
                              name="city"
                              id="city"
                              placeholder="city"
                              onChange={inputHandle}
                              value={state.city}
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md"
                            />
                          </div>
                        </div>
                        <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="area">Area</label>
                            <input
                              type="text"
                              name="area"
                              id="area"
                              placeholder="area"
                              onChange={inputHandle}
                              value={state.area}
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md"
                            />
                          </div>
                          <div className="flex flex-col gap-1 mt-3 w-full">
                            <button className="px-3 py-[6px] rounded-sm hover:shadow-indigo-500/20 hover:shadow-lg bg-indigo-500 text-white">
                              Save
                            </button>
                          </div>
                        </div>
                      </form>
                    </>
                  )}
                  {res && (
                    <div className="flex flex-col gap-1">
                      <h2>Deliver to {state.name}</h2>
                      <p>
                        <span>Home</span>
                        <span></span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="w-[33%] md-lg:w-full"></div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Shipping;
