import React from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { Link } from "react-router-dom";

const Payments = () => {
  return (
    <div className="px-2 md:px-7 py-5">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="flex justify-between items-center p-5 bg-ebony_clay rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-iron">
            <h2 className="text-lg font-bold">$6566</h2>
            <span className="text-sm">Total Sales</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-ufo_green flex justify-center items-center text-xl">
            <BsCurrencyDollar className=" text-jungle_green shadow-lg" />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-ebony_clay rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-iron">
            <h2 className="text-lg font-bold">$366</h2>
            <span className="text-sm">Available Amount</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-phlox flex justify-center items-center text-xl">
            <BsCurrencyDollar className=" text-electric_violet shadow-lg" />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-ebony_clay rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-iron">
            <h2 className="text-lg font-bold">$0</h2>
            <span className="text-sm">Withdrawal Amount</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-dark_turquoise flex justify-center items-center text-xl">
            <BsCurrencyDollar className=" text-robins_egg_blue shadow-lg" />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-ebony_clay rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-iron">
            <h2 className="text-lg font-bold">$0</h2>
            <span className="text-sm">Pending Amount</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-old_lavender flex justify-center items-center text-xl">
            <BsCurrencyDollar className=" text-electric_violet shadow-lg" />
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 pb-4 mt-5">
        <div className=" bg-ebony_clay text-iron rounded-md p-5">
          <h2 className="text-lg">Send Request</h2>
          <div className="pt-5">
            <form action="">
              <div className="flex gap-3 flex-wrap">
                <input
                  type="number"
                  min={0}
                  name="amount"
                  className="px-3 py-2 focus:border-indigo-500 outline-none bg-ebony_clay border border-slate-700 rounded-md text-iron md:w-[86%]"
                />
                <button className=" bg-indigo-500 hover:shadow-indigo-500/50 hover:shadow-lg text-white rounded-sm px-4 py-2  text-sm">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
