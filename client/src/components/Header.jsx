import React from "react";
import { IoIosMail } from "react-icons/io";
import { FaFacebookF, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { AiFillGithub } from "react-icons/ai";

const Header = () => {
  return (
    <div className="w-full bg-white">
      <div className="header-top bg-gallery md-lg:hidden">
        <div className="w-[85%] lg:w-[90%] mx-auto">
          <div className="flex w-full justify-between items-center h-[50px] text-slate-500">
            <ul className="flex justify-start items-center gap-8">
              <li className="flex relative justify-center items-center gap-2 text-sm after:absolute after:h-[18px] after:w-[1px] after:bg-silver_chalice after:-right-4">
                <span>
                  <IoIosMail />
                </span>
                <span>admin@gmail.com</span>
              </li>
              <span>Multi Vendor E-commerce</span>
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

                <div className="flex cursor-pointer text-slate-800 text-sm justify-center items-center gap-1 relative after:absolute after:h-[18px] after:w-[1px] after:bg-silver_chalice after:-right-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
