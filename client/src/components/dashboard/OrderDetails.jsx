import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { get_order_details } from "../../store/reducers/orderReducer";

const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { myOrder } = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(get_order_details(orderId));
  }, []);
  return (
    <div className="bg-white p-5">
      <h2></h2>
    </div>
  );
};

export default OrderDetails;
