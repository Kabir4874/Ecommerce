import React, { useState } from "react";
import Search from "../components/Search";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";

const DiscountProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [perPage, setPerPage] = useState(5);
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-ebony_clay rounded-md">
        <Search
          setPerPage={setPerPage}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <div className=" relative overflow-x-auto mt-8">
          <table className="w-full text-sm text-left text-iron">
            <thead className="text-sm uppercase border-b border-slate-700">
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
                  Category
                </th>
                <th scope="col" className="py-1 px-4">
                  Brand
                </th>
                <th scope="col" className="py-1 px-4">
                  Price
                </th>
                <th scope="col" className="py-1 px-4">
                  Discount
                </th>
                <th scope="col" className="py-1 px-4">
                  Stock
                </th>
                <th scope="col" className="py-1 px-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((d, i) => (
                <tr key={i}>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    {d}
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    <img
                      src={`http://localhost:3000/images/category/${d}.jpg`}
                      alt=""
                      className="w-[45px] h-[45px]"
                    />
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    <span>T-shirt</span>
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    <span>Sports</span>
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    <span>Easy</span>
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    <span>$23</span>
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    <span>5%</span>
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    <span>50</span>
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    <div className="flex justify-start items-center gap-4">
                      <Link className="p-[6px] bg-yellow-600 rounded hover:shadow-lg hover:shadow-yellow-600/50">
                        <FaEdit />
                      </Link>
                      <Link className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50">
                        <FaEye />
                      </Link>
                      <button className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50">
                        <FaTrash />
                      </button>
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
  );
};

export default DiscountProducts;
