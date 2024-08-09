import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { get_inactive_sellers } from "../../store/reducers/sellerReducer";

const InactiveSellers = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [show, setShow] = useState(false);
  const { sellers, totalSeller } = useSelector((state) => state.seller);

  useEffect(() => {
    const obj = {
      perPage: parseInt(perPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_inactive_sellers(obj));
  }, [searchValue, currentPage, perPage]);
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-ebony_clay rounded-md">
        <div className="w-full">
          <div className="w-full p-4 bg-ebony_clay rounded-md">
            <div className="flex justify-between items-center">
              <select
                onChange={(e) => setPerPage(parseInt(e.target.value))}
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-ebony_clay border border-slate-700 rounded-md text-iron"
              >
                <option value="5">5</option>
                <option value="15">15</option>
                <option value="25">25</option>
              </select>
              <input
                type="text"
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
                placeholder="search"
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-ebony_clay border border-slate-700 rounded-md text-iron"
              />
            </div>
            <div className=" relative overflow-x-auto mt-8">
              <table className="w-full text-sm text-left text-iron">
                <thead className="text-sm uppercase whitespace-nowrap border-b border-slate-700">
                  <tr>
                    <th scope="col" className="py-1 px-4">
                      No.
                    </th>
                    <th scope="col" className="py-1 px-4">
                      Image
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
                    <tr key={i}>
                      <td className="py-3 px-4 whitespace-nowrap">{i + 1}</td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <img
                          src={d.image}
                          alt="profile"
                          className="w-[45px] h-[45px]"
                        />
                      </td>
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
            {totalSeller >= perPage && (
              <div className="w-full flex justify-end mt-4 bottom-4 right-4">
                <Pagination
                  pageNumber={currentPage}
                  setPageNumber={setCurrentPage}
                  totalItem={totalSeller}
                  perPage={perPage}
                  showItem={Math.floor(totalSeller / perPage)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InactiveSellers;
