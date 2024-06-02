import React from "react";
import { BsCurrencyDollar } from "react-icons/bs";
const AdminDashboard = () => {
  return (
    <div className="px-2 md:px-7 py-5">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
        <div className="flex justify-between items-center p-5 bg-ebony_clay rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-iron">
            <h2 className="text-3xl font-bold">$6566</h2>
            <span className="text-md font-medium">Total Sales</span>
          </div>
          <div>
            <BsCurrencyDollar/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
