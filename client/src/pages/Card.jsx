import React, { useEffect } from "react";
import Header from "../components/Header";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  delete_card_product,
  get_card_products,
  messageClear,
  quantity_inc,
  quantity_dec,
} from "../store/reducers/cardReducer";
import toast from "react-hot-toast";
const Card = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    card_products,
    shipping_fee,
    outOfStock_products,
    buy_product_item,
    price,
    successMessage,
  } = useSelector((state) => state.card);

  const redirect = () => {
    navigate("/shipping", {
      state: {
        products: card_products,
        price: price,
        shipping_fee: shipping_fee,
        items: buy_product_item,
      },
    });
  };
  useEffect(() => {
    dispatch(get_card_products(userInfo.id));
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      dispatch(get_card_products(userInfo.id));
    }
  }, [successMessage]);

  const inc = (quantity, stock, card_id) => {
    const temp = quantity + 1;
    if (temp <= stock) {
      dispatch(quantity_inc(card_id));
    }
  };
  const dec = (quantity, card_id) => {
    const temp = quantity - 1;
    if (temp !== 0) { const inc = (quantity, stock, card_id) => {
      const temp = quantity + 1;
      if (temp <= stock) {
        dispatch(quantity_inc(card_id));
      }
    };
    const dec = (quantity, card_id) => {
      const temp = quantity - 1;
      if (temp !== 0) {
        dispatch(quantity_dec(card_id));
      }
    };
      dispatch(quantity_dec(card_id));
    }
  };
  return (
    <div>
      <Header />
      <section className='bg-[url("http://localhost:3000/images/banner/card.jpg")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
        <div className="absolute left-0 top-0 w-full h-full bg-raisin_black">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
              <h2 className="text-3xl font-bold">Shop.my</h2>
              <div className="flex justify-center items-center gap-2 text-2xl w-full">
                <Link to={"/"}>Home</Link>
                <span className="pt-2">
                  <MdOutlineKeyboardArrowRight />
                </span>
                <span>Card</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className=" bg-gallery">
        <div className="w-[85%] lg:w-[90%] mx-auto py-16">
          {card_products.length > 0 || outOfStock_products.length > 0 ? (
            <div className="flex flex-wrap">
              <div className="w-[67%] md-lg:w-full">
                <div className="pr-3 md-lg:pr-0">
                  <div className="flex flex-col gap-3">
                    <div className="bg-white p-4">
                      <h2 className="text-green-500 font-semibold">
                        Stock Products {card_products.length}
                      </h2>
                    </div>
                    {card_products.map((p, i) => (
                      <div key={i} className="flex bg-white p-4 flex-col gap-2">
                        <div className="flex justify-start items-center">
                          <h2 className="text-slate-600">{p.shopName}</h2>
                        </div>
                        {p.products.map((product, i) => (
                          <div key={i} className="w-full flex flex-wrap">
                            <div className="flex sm:w-full gap-2 w-7/12">
                              <div className="flex gap-2 justify-start items-center">
                                <img
                                  src={product.productInfo.images[0]}
                                  alt="product"
                                  className="w-[80px] h-[80px]"
                                />
                                <div className="pr-4 text-slate-600">
                                  <h2>{product.productInfo.name}</h2>
                                  <span className="text-sm">
                                    Brand: {product.productInfo.brand}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-between w-5/12 sm:w-full sm:mt-3">
                              <div className="pl-4 sm:pl-0">
                                <h2 className="text-lg text-orange-500">
                                  $
                                  {product.productInfo.price -
                                    Math.floor(
                                      (product.productInfo.price *
                                        product.productInfo.discount) /
                                        100
                                    )}
                                </h2>
                                {product.productInfo.discount > 0 && (
                                  <p className=" line-through">
                                    ${product.productInfo.price}
                                  </p>
                                )}
                                {product.productInfo.discount > 0 && (
                                  <p> -{product.productInfo.discount}%</p>
                                )}
                              </div>

                              <div className="flex gap-2 flex-col">
                                <div className="flex bg-slate-200 h-[30px] justify-center items-center text-xl">
                                  <div
                                    onClick={() =>
                                      dec(product.quantity, product._id)
                                    }
                                    className="px-3 cursor-pointer select-none"
                                  >
                                    {" "}
                                    -
                                  </div>
                                  <div className="px-3">{product.quantity}</div>
                                  <div
                                    onClick={() =>
                                      inc(
                                        product.quantity,
                                        product.productInfo.stock,
                                        product._id
                                      )
                                    }
                                    className="px-3 cursor-pointer select-none"
                                  >
                                    +
                                  </div>
                                </div>

                                <button
                                  onClick={() =>
                                    dispatch(delete_card_product(product._id))
                                  }
                                  className="px-5 py-[3px] bg-red-500 text-white"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                    {outOfStock_products.length > 0 && (
                      <div className="flex flex-col gap-3">
                        <div className="bg-white p-4">
                          <h2 className="text-red-500 font-semibold">
                            Out Of Stock {outOfStock_products.length}
                          </h2>
                        </div>
                        <div className="bg-white p-4 flex flex-col gap-2">
                          {outOfStock_products.map((p, i) => (
                            <div key={i} className="w-full flex flex-wrap">
                              <div className="flex sm:w-full gap-2 w-7/12">
                                <div className="flex gap-2 justify-start items-center">
                                  <img
                                    src={p.products[0].images[0]}
                                    alt="product"
                                    className="w-[80px] h-[80px]"
                                  />
                                  <div className="pr-4 text-slate-600">
                                    <h2>{p.products[0].name}</h2>
                                    <span className="text-sm">
                                      Brand: {p.products[0].brand}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex justify-between w-5/12 sm:w-full sm:mt-3">
                                <div className="pl-4 sm:pl-0">
                                  <h2 className="text-lg text-orange-500">
                                    $
                                    {p.products[0].price -
                                      Math.floor(
                                        (p.products[0].price *
                                          p.products[0].discount) /
                                          100
                                      )}
                                  </h2>
                                  {p.products[0].discount > 0 && (
                                    <p className=" line-through">
                                      ${p.products[0].price}
                                    </p>
                                  )}
                                  {p.products[0].discount > 0 && (
                                    <p> -{p.products[0].discount}%</p>
                                  )}
                                </div>

                                <div className="flex gap-2 flex-col">
                                  <div className="flex bg-slate-200 h-[30px] justify-center items-center text-xl">
                                    <div
                                      onClick={() => dec(p.quantity, p._id)}
                                      className="px-3 cursor-pointer select-none"
                                    >
                                      -
                                    </div>
                                    <div className="px-3">{p.quantity}</div>
                                    <div
                                      onClick={() =>
                                        inc(
                                          p.quantity,
                                          p.products[0].stock,
                                          p._id
                                        )
                                      }
                                      className="px-3 cursor-pointer select-none"
                                    >
                                      +
                                    </div>
                                  </div>

                                  <button
                                    onClick={() =>
                                      dispatch(delete_card_product(p._id))
                                    }
                                    className="px-5 py-[3px] bg-red-500 text-white"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-[33%] md-lg:w-full">
                <div className="pl-3 md-lg:pl-0 md-lg:mt-5">
                  {card_products.length > 0 && (
                    <div className="bg-white flex flex-col gap-3 p-3 text-slate-600">
                      <h2 className="text-xl font-bold">Order Summary</h2>
                      <div className="flex justify-between items-center">
                        <span>{buy_product_item} Items</span>
                        <span>${price}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Shipping Fee</span>
                        <span>${shipping_fee}</span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter Voucher Coupon"
                          className="w-full py-2 px-3 border border-slate-200 outline-none focus:border-green-500 rounded-sm"
                        />
                        <button className="px-5 py-[1px] bg-blue-500 text-white rounded-sm text-sm uppercase">
                          Apply
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Total: </span>
                        <span className="text-lg text-orange-500">
                          ${price + shipping_fee}
                        </span>
                      </div>
                      <button
                        onClick={redirect}
                        className="px-5 py-[6px] rounded-sm hover:shadow-orange-500/20 hover:shadow-lg bg-orange-500 text-sm text-white uppercase"
                      >
                        Proceed to checkout {buy_product_item}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Link
                to={"/shops"}
                className="px-4 py-1 bg-indigo-500 text-white mx-auto"
              >
                Shop Now
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Card;
