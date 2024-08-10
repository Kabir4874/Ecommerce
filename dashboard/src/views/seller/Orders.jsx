import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { useDispatch, useSelector } from "react-redux";
import { get_seller_orders } from "../../store/reducers/orderReducer";

const Orders = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [perPage, setPerPage] = useState(5);
  const { userInfo } = useSelector((state) => state.auth);
  const { totalOrder, myOrders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(
      get_seller_orders({
        perPage,
        page: currentPage,
        searchValue,
        sellerId: userInfo._id,
      })
    );
  }, [perPage, currentPage, searchValue]);
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-ebony_clay rounded-md">
        <Search
          setPerPage={setPerPage}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <div className=" relative overflow-x-auto">
          <table className="w-full text-sm text-left text-iron">
            <thead className="text-sm uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  Order Id
                </th>
                <th scope="col" className="py-3 px-4">
                  Price
                </th>
                <th scope="col" className="py-3 px-4">
                  Payment Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Order Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Date
                </th>
                <th scope="col" className="py-3 px-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map((d, i) => (
                <tr key={i}>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    {d._id}
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    ${d.price}
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    <span>{d.payment_status}</span>
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    <span>{d.delivery_status}</span>
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    {d.date}
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    <Link
                      to={`/seller/dashboard/order/details/${d._id}`}
                      className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50 flex justify-center items-center w-[30px]"
                    >
                      <FaEye />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full flex justify-end mt-4 bottom-4 right-4">
          <Pagination
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItem={totalOrder}
            perPage={perPage}
            showItem={Math.floor(totalOrder / perPage)}
          />
        </div>
      </div>
    </div>
  );
};

export default Orders;
