import React from "react";
import { Link } from "react-router-dom";
import FadeLoader from "react-spinners/FadeLoader";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import error from "../assets/error.png";
import success from "../assets/success.png";
const load = async () => {
  return await loadStripe(
    "pk_test_51PmF6FIR1dQbKMRJ28xNPIbFCxHC65QFFomrafKSTy5zGQoGqVFFwGO2USlidniImkfu0Gqy0VmHy6zxl8vJNiTe00ubMN0Mdw"
  );
};
const ConfirmOrder = () => {
  const [loader, setLoader] = useState(true);
  const [stripe, setStripe] = useState("");
  const [message, setMessage] = useState(null);
  useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (!clientSecret) {
      return;
    }
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("succeeded");
          break;
        case "processing":
          setMessage("processing");
          break;
        case "required_payment":
          setMessage("failed");
          break;
        default:
          setMessage("failed");
      }
    });
  }, [stripe]);
  const get_load = async () => {
    const tempStripe = await load();
    setStripe(tempStripe);
  };
  useEffect(() => {
    get_load();
  }, []);

  const update_payment = async () => {
    const orderId = localStorage.getItem("orderId");
    if (orderId) {
      try {
        await axios.get(`http://localhost:5000/api/order/confirm/${orderId}`);
        setLoader(false);
        localStorage.removeItem("orderId");
      } catch (error) {
        console.log(error.response.data);
      }
    }
  };
  useEffect(() => {
    if (message === "succeeded") {
      update_payment();
    }
  }, [message]);
  return (
    <div className=" w-screen h-screen flex justify-center items-center flex-col gap-4">
      {message === "failed" || message === "processing" ? (
        <>
          <img src={error} alt="error logo" />
          <Link
            to={"/dashboard/my-orders"}
            className="px-5 py-2 bg-green-500 rounded-sm text-white"
          >
            Back to Dashboard
          </Link>
        </>
      ) : message === "succeeded" ? (
        loader ? (
          <FadeLoader />
        ) : (
          <>
            <img src={success} alt="success logo" />
            <Link
              to={"/dashboard/my-orders"}
              className="px-5 py-2 bg-green-500 rounded-sm text-white"
            >
              Back to Dashboard
            </Link>
          </>
        )
      ) : (
        <FadeLoader />
      )}
    </div>
  );
};

export default ConfirmOrder;