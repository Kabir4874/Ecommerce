import React, { useEffect } from "react";
import { AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { FaEye } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Ratings from "../Ratings";
import { useDispatch, useSelector } from "react-redux";
import {
  add_to_card,
  add_to_wishlist,
  messageClear,
} from "../../store/reducers/cardReducer";
import toast from "react-hot-toast";

const FeatureProducts = ({ products }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { successMessage, errorMessage } = useSelector((state) => state.card);
  const add_card = (id) => {
    if (userInfo) {
      dispatch(
        add_to_card({
          userId: userInfo.id,
          quantity: 1,
          productId: id,
        })
      );
    } else {
      navigate("/login");
    }
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
  }, [successMessage, errorMessage]);

  const add_wishlist = (pro) => {
    dispatch(
      add_to_wishlist({
        userId: userInfo.id,
        productId: pro._id,
        name: pro.name,
        image: pro.images[0],
        price: pro.price,
        discount: pro.discount,
        rating: pro.rating,
        slug: pro.slug,
      })
    );
  };

  return (
    <div className="w-[85%] flex flex-wrap mx-auto">
      <div className="w-full">
        <div className="text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px]">
          <h2>Feature Products</h2>
          <div className="w-[100px] h-1 bg-sushi mt-4" />
        </div>
      </div>
      <div className="w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
        {products.map((p, i) => (
          <div
            key={i}
            className="border group transition-all duration-500 hover:shadow-md hover:-mt-3"
          >
            <div className="relative overflow-hidden">
              {p.discount ? (
                <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
                  {p.discount}%
                </div>
              ) : (
                ""
              )}
              <img
                src={p.images[0]}
                alt="product img"
                className="w-full h-[240px]"
              />
              <ul className="flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3">
                <li
                  onClick={() => add_wishlist(p)}
                  className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-sushi hover:text-white hover:rotate-[720deg] transition-all"
                >
                  <AiFillHeart />
                </li>
                <Link
                  to={`/product/details/${p.slug}`}
                  className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-sushi hover:text-white hover:rotate-[720deg] transition-all"
                >
                  <FaEye />
                </Link>
                <li
                  onClick={() => add_card(p._id)}
                  className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-sushi hover:text-white hover:rotate-[720deg] transition-all"
                >
                  <AiOutlineShoppingCart />
                </li>
              </ul>
            </div>
            <div className="py-3 text-slate-600 px-2">
              <h2>{p.name}</h2>
              <div className="flex justify-start items-center gap-3">
                <span className="text-lg font-bold">${p.price}</span>
                <div className="flex">
                  <Ratings ratings={p.rating} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureProducts;
