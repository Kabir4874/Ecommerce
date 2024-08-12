import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FadeLoader from "react-spinners/FadeLoader";
import {
  active_stripe_connect_account,
  messageClear,
} from "../store/reducers/sellerReducer";
import error from "../assets/error.png";
import success from "../assets/success.png";
const Success = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loader, errorMessage, successMessage } = useSelector(
    (state) => state.seller
  );
  const queryParams = new URLSearchParams(window.location.search);
  const activeCode = queryParams.get("activeCode");

  useEffect(() => {
    dispatch(active_stripe_connect_account(activeCode));
  }, [activeCode]);
  const redirect = () => {
    dispatch(messageClear());
    navigate("/");
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-4">
      {loader ? (
        <FadeLoader />
      ) : errorMessage ? (
        <>
          <img src={error} alt="error_img" />{" "}
          <button className="px-5 py-2 bg-green-500 rounded-sm text-white">
            Back to Dashboard
          </button>
        </>
      ) : (
        successMessage && (
          <>
            <img src={success} alt="error_img" />{" "}
            <button className="px-5 py-2 bg-green-500 rounded-sm text-white">
              Back to Dashboard
            </button>
          </>
        )
      )}
    </div>
  );
};

export default Success;
