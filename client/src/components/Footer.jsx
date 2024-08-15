import React from "react";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillHeart,
  AiFillShopping,
} from "react-icons/ai";
import { FaFacebook, FaLinkedin } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
const Footer = () => {
  const { card_products_count, wishlist_count } = useSelector(
    (state) => state.card
  );
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <footer className=" bg-catskill_white">
      <div className="w-[85%] flex flex-wrap mx-auto border-b py-16 md-lg:pb-10 sm:pb-6">
        <div className="w-3/12 lg:w-4/12 sm:w-full">
          <div className="flex flex-col gap-3">
            <img
              src="http://localhost:3000/images/logo.png"
              alt="logo"
              className="w-[190px] h-[70px]"
            />
            <ul className="flex flex-col gap-2 text-slate-600">
              <li>Address: Mirpur,Dhaka</li>
              <li>Phone: 343253234</li>
              <li>Email: kabir@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="w-5/12 lg:w-8/12 sm:w-full">
          <div className="flex justify-center sm:justify-start sm:mt-6 w-full">
            <div>
              <h2 className="font-bold text-lg mb-2">Useful Links</h2>
              <div className="flex justify-between gap-[80px] lg:gap-[40px]">
                <ul className="flex flex-col gap-2 text-slate-600 text-sm">
                  <li>
                    <Link>About Us</Link>
                  </li>
                  <li>
                    <Link>About Our Shop</Link>
                  </li>
                  <li>
                    <Link>Delivery Information</Link>
                  </li>
                  <li>
                    <Link>Privacy Policy</Link>
                  </li>
                  <li>
                    <Link>Blogs</Link>
                  </li>
                </ul>

                <ul className="flex flex-col gap-2 text-slate-600 text-sm">
                  <li>
                    <Link>Who We Are</Link>
                  </li>
                  <li>
                    <Link>Our Services</Link>
                  </li>
                  <li>
                    <Link>Projects</Link>
                  </li>
                  <li>
                    <Link>Contact</Link>
                  </li>
                  <li>
                    <Link>Innovation</Link>
                  </li>
                  <li>
                    <Link>Testimonials</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="w-4/12 lg:w-full lg:mt-6">
          <div className="w-full flex flex-col justify-start gap-5">
            <h2 className="font-bold text-lg mb-2">Join Our</h2>
            <span>
              Get Email updates about our latest and shop specials offers
            </span>
            <div className="h-[50px] w-full bg-white border relative">
              <input
                type="text"
                placeholder="Enter your mail"
                className="h-full bg-transparent w-full px-3 outline-none"
              />
              <button className="h-full absolute right-0 bg-indigo-500 text-white uppercase px-4 font-bold text-sm">
                Subscribe
              </button>
            </div>

            <ul className="flex justify-start items-center gap-3">
              <li>
                <a
                  href="#"
                  className="w-[38px] h-[38px] hover:bg-sushi hover:text-white flex justify-center items-center bg-white rounded-full transition-all duration-200"
                >
                  <FaFacebook />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="w-[38px] h-[38px] hover:bg-sushi hover:text-white flex justify-center items-center bg-white rounded-full transition-all duration-200"
                >
                  <AiOutlineTwitter />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="w-[38px] h-[38px] hover:bg-sushi hover:text-white flex justify-center items-center bg-white rounded-full transition-all duration-200"
                >
                  <FaLinkedin />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="w-[38px] h-[38px] hover:bg-sushi hover:text-white flex justify-center items-center bg-white rounded-full transition-all duration-200"
                >
                  <AiFillGithub />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-[85%] flex flex-wrap justify-center items-center text-slate-600 mx-auto py-5 text-center">
        <span>
          Copyright ©2024 All right reserved | made by{" "}
          <a href="#" className="text-blue-500 underline">
            @Kabir_Ahmed_Ridoy
          </a>
        </span>
      </div>

      <div className="hidden fixed md-lg:block w-[50px] bottom-3 h-[100px] right-2 bg-white rounded-full p-2">
        <div className=" w-full h-full flex gap-2 flex-col justify-center items-center">
          <Link to={`${userInfo ? "/dashboard/my-wishlist" : "/login"}`}>
            <div className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-mercury">
              <span className="text-xl text-red-500">
                <AiFillHeart />
              </span>
              {wishlist_count !== 0 && (
                <div className="w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]">
                  {wishlist_count}
                </div>
              )}
            </div>
          </Link>
          <Link to={`${userInfo ? "/card" : "/login"}`}>
            <div className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-mercury">
              <span className="text-xl text-orange-500">
                <AiFillShopping />
              </span>
              {card_products_count !== 0 && (
                <div className="w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]">
                  {card_products_count}
                </div>
              )}
            </div>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
