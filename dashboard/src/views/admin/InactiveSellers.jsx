import React, { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { FaEye } from "react-icons/fa";

const InactiveSellers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [show, setShow] = useState(false);
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
                  {[1, 2, 3, 4, 5].map((d, i) => (
                    <tr key={i}>
                      <td className="py-3 px-4 whitespace-nowrap">{d}</td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <img
                          src={`http://localhost:3000/images/category/${d}.jpg`}
                          alt=""
                          className="w-[45px] h-[45px]"
                        />
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span>Rakib Khan</span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span>rakib@gmail.com</span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span>Active</span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span>Inactive</span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex justify-start items-center gap-4">
                          <Link className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50">
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
              <Pagination
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                totalItem={20}
                perPage={perPage}
                showItem={4}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InactiveSellers;
