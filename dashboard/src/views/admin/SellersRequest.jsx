import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { FaEye } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { get_seller_request } from "../../store/reducers/sellerReducer";
import Search from "../components/Search";

const SellersRequest = () => {
  const dispatch = useDispatch();
  const { sellers, totalSeller } = useSelector((state) => state.seller);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(
      get_seller_request({
        perPage,
        searchValue,
        page: currentPage,
      })
    );
  }, [searchValue, currentPage, perPage]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-ebony_clay rounded-md">
        <div className="w-full">
          <div className="w-full p-4 bg-ebony_clay rounded-md">
            <Search
              setPerPage={setPerPage}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
            <div className=" relative overflow-x-auto mt-8">
              <table className="w-full text-sm text-left text-iron">
                <thead className="text-sm uppercase whitespace-nowrap border-b border-slate-700">
                  <tr>
                    <th scope="col" className="py-1 px-4">
                      No.
                    </th>
                    <th scope="col" className="py-1 px-4">
                      Name
                    </th>
                    <th scope="col" className="py-1 px-4">
                      Email
                    </th>
                    <th scope="col" className="py-1 px-4">
                      Payment Status
                    </th>
                    <th scope="col" className="py-1 px-4">
                      Status
                    </th>
                    <th scope="col" className="py-1 px-4">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sellers.map((d, i) => (
                    <tr key={i} className=" border-b border-slate-700">
                      <td className="py-3 px-4 whitespace-nowrap">{i + 1}</td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span>{d.name}</span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span>{d.email}</span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span>{d.payment}</span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span>{d.status}</span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex justify-start items-center gap-4">
                          <Link
                            to={`/admin/dashboard/seller/details/${d._id}`}
                            className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50"
                          >
                            <FaEye />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="w-full flex justify-end mt-4 bottom-4 right-4">
              {totalSeller <= perPage ? (
                ""
              ) : (
                <Pagination
                  pageNumber={currentPage}
                  setPageNumber={setCurrentPage}
                  totalItem={totalSeller}
                  perPage={perPage}
                  showItem={4}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellersRequest;
