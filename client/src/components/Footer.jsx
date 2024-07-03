import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
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
                <span>Get Email updates about our latest and shop specials offers</span>
                <div className="h-[50px] w-full bg-white border relative">
                    <input type="text" placeholder="Enter your mail" className="h-full bg-transparent w-full px-3 outline-none"/>
                    <button className="h-full absolute right-0 bg-indigo-500 text-white uppercase px-4 font-bold text-sm">Subscribe</button>

                </div>

            </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
