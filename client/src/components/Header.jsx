import React, { useState } from "react";
import { IoIosMail } from "react-icons/io";
import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaUser,
  FaLock,
  FaList,
} from "react-icons/fa6";
import { AiFillGithub } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();
  const user = true;
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <div className="w-full bg-white">
      {/* Header Top  */}
      <div className="bg-gallery md-lg:hidden">
        <div className="w-[85%] lg:w-[90%] mx-auto">
          <div className="flex w-full justify-between items-center h-[50px] text-slate-500">
            <ul className="flex justify-start items-center gap-8">
              <li className="flex relative justify-center items-center gap-2 text-sm after:absolute after:h-[18px] after:w-[1px] after:bg-silver_chalice after:-right-4">
                <span>
                  <IoIosMail />
                </span>
                <span>admin@gmail.com</span>
              </li>
              <span className="text-sm">Multi Vendor E-commerce</span>
            </ul>
            <div>
              <div className="flex justify-center items-center gap-10">
                <div className="flex justify-center items-center gap-4">
                  <a href="#">
                    <FaFacebookF />
                  </a>
                  <a href="#">
                    <FaXTwitter />
                  </a>
                  <a href="#">
                    <FaLinkedinIn />
                  </a>
                  <a href="#">
                    <AiFillGithub />
                  </a>
                </div>

                <div className="flex group cursor-pointer text-slate-800 text-sm justify-center items-center gap-1 relative after:absolute after:h-[18px] after:w-[1px] after:bg-silver_chalice after:-right-4 before:absolute before:h-[18px] before:w-[1px] before:bg-silver_chalice before:-left-[20px]">
                  <img
                    src="http://localhost:3000/images/language.png"
                    alt="language"
                  />
                  <span>
                    <MdOutlineKeyboardArrowDown />
                  </span>
                  <ul className="absolute invisible transition-all top-12 rounded-sm duration-200 text-white p-2 w-[100px] flex flex-col gap-3 group-hover:visible group-hover:top-6 bg-black z-10">
                    <li>Bangla</li>
                    <li>English</li>
                  </ul>
                </div>
                {user ? (
                  <Link
                    to={"/dashboard"}
                    className="flex justify-center items-center gap-2 text-sm"
                  >
                    <span>
                      <FaUser />
                    </span>
                    <span>Kabir Ahmed</span>
                  </Link>
                ) : (
                  <div className="flex justify-center items-center gap-2 text-sm">
                    <span>
                      <FaLock />
                    </span>
                    <span>Login</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar  */}
      <div className="w-full">
        <div className="w-[85%] lg:w-[90%] mx-auto">
          <div className="h-[80px] md-lg:h-[100px] flex justify-between items-center flex-wrap">
            <div className="md-lg:w-full w-3/12 md-lg:pt-4">
              <div className="flex justify-between items-center">
                <Link to={"/"}>
                  <img src="http://localhost:3000/images/logo.png" alt="logo" />
                </Link>
                <div
                  onClick={() => setShowSidebar(false)}
                  className="justify-center items-center w-[30px] h-[30px] bg-white text-slate-600 border border-slate-600 rounded-sm cursor-pointer lg:hidden md-lg:flex xl:hidden hidden"
                >
                  <span>
                    <FaList />
                  </span>
                </div>
              </div>
            </div>
            <div className="md-lg:w-full w-9/12">
              <div className="flex justify-between md-lg:justify-center items-center flex-wrap pl-8">
                <ul className="flex justify-start items-start gap-8 text-sm font-bold uppercase md-lg:hidden">
                  <li>
                    <Link
                      to={"/"}
                      className={`p-2 block ${
                        pathname === "/" ? "text-sushi" : ""
                      }`}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/shop"}
                      className={`p-2 block ${
                        pathname === "/shop" ? "text-sushi" : ""
                      }`}
                    >
                      shop
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/blog"}
                      className={`p-2 block ${
                        pathname === "/blog" ? "text-sushi" : ""
                      }`}
                    >
                      blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/about"}
                      className={`p-2 block ${
                        pathname === "/about" ? "text-sushi" : ""
                      }`}
                    >
                      about
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/contact"}
                      className={`p-2 block ${
                        pathname === "/contact" ? "text-sushi" : ""
                      }`}
                    >
                      contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
