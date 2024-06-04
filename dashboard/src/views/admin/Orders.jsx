import React, { useState } from "react";

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [perPage, setPerPage] = useState(5);
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-ebony_clay rounded-md">
        <div className="flex justify-between items-center">
          <select
            onChange={(e) => perPage(parseInt(e.target.value))}
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
        <div className="relative mt-5 overflow-x-auto">
          <div className="w-full text-sm text-iron">
            <div className=" uppercase border-b border-slate-700"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
