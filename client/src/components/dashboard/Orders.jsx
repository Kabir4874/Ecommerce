import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { get_orders } from "../../store/reducers/orderReducer";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState("all");
  const { userInfo } = useSelector((state) => state.auth);
  const { myOrders, myOrder } = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(get_orders({ status: state, customerId: userInfo.id }));
  }, [state]);

  const redirect = (order) => {
    let items = 0;
    for (let i = 0; i < order.length; i++) {
      items = order.products[i].quantity + items;
    }
    navigate("/payment", {
      state: { price: order.price, items, orderId: order._id },
    });
  };
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-600">My Orders</h2>
        <select
          name=""
          id=""
          className="outline-none px-3 py-1 border rounded-md text-slate-600"
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option value="all">--order status--</option>
          <option value="placed">Placed</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
          <option value="warehouse">Warehouse</option>
        </select>
      </div>
      <div className="pt-4">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Order Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Payment Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Order Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map((o, i) => (
                <tr key={o._id} className="bg-white border-b">
                  <td className="px-6 py-4 font-medium whitespace-nowrap">
                    {o._id}
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-nowrap">
                    ${o.price}
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-nowrap">
                    {o.payment_status}
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-nowrap">
                    {o.delivery_status}
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`/dashboard/order/details/${o._id}`}>
                      <span className="bg-green-100 text-green-800 text-sm mr-2 px-2.5 py-[1px] rounded">
                        view
                      </span>
                    </Link>
                    {o.payment_status !== "paid" && (
                      <span
                        onClick={() => redirect(o)}
                        className="bg-red-100 text-red-800 text-sm mr-2 px-2.5 py-[1px] rounded cursor-pointer"
                      >
                        Pay Now
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
