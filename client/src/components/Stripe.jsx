import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const stripePromise = loadStripe(
  "pk_live_51PmF6FIR1dQbKMRJ7kZPAR7HcrpDpkrK3YsDd1jLQ7G33b92cSwqbBvKHELPvswMUgheDIgWnDsUHMhyI3Hf9BDN00oVPzDZPF"
);
const Stripe = ({ price, orderId }) => {
  const [clientSecret, setClientSecret] = useState("");
  const apperance = {
    theme: "stripe",
  };
  const options = {
    apperance,
    clientSecret,
  };
  const create_payment = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/order/create-payment",
        { price },
        { withCredentials: true }
      );
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <div>
      {clientSecret ? (
        <div>
          <Elements options={options}></Elements>
        </div>
      ) : (
        <button>Start Payment</button>
      )}
    </div>
  );
};

export default Stripe;
