import React from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { RiProductHuntLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Chart from "react-apexcharts";
const AdminDashboard = () => {
  const state = {
    series: [
      {
        name: "Orders",
        data: [23, 24, 52, 42, 3, 5, 2, 34, 23, 5, 6, 1],
      },
      {
        name: "Revenue",
        data: [21, 54, 58, 12, 31, 35, 62, 34, 13, 65, 66, 71],
      },
      {
        name: "Sellers",
        data: [26, 24, 62, 42, 32, 56, 28, 32, 22, 52, 62, 18],
      },
    ],
    options: {
      color: ["#181ee8", "#181ee8"],
      plotOptions: {
        radius: 30,
      },
      chart: {
        background: "transparent",
        foreColor: "#d0d2d6",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        curve: ["smooth", "straight", "stepline"],
        lineCap: "butt",
        colors: "#f0f0f0",
        width: 0.5,
        dashArray: 0,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apl",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      legend: {
        position: "top",
      },
    },
  };
  return (
    <div className="px-2 md:px-7 py-5">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
        <div className="flex justify-between items-center p-5 bg-ebony_clay rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-iron">
            <h2 className="text-3xl font-bold">$6566</h2>
            <span className="text-md font-medium">Total Sales</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-ufo_green flex justify-center items-center text-xl">
            <BsCurrencyDollar className=" text-jungle_green shadow-lg" />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-ebony_clay rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-iron">
            <h2 className="text-3xl font-bold">66</h2>
            <span className="text-md font-medium">Products</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-phlox flex justify-center items-center text-xl">
            <RiProductHuntLine className=" text-electric_violet shadow-lg" />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-ebony_clay rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-iron">
            <h2 className="text-3xl font-bold">50</h2>
            <span className="text-md font-medium">Sellers</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-dark_turquoise flex justify-center items-center text-xl">
            <FaUsers className=" text-robins_egg_blue shadow-lg" />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-ebony_clay rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-iron">
            <h2 className="text-3xl font-bold">12</h2>
            <span className="text-md font-medium">Orders</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-old_lavender flex justify-center items-center text-xl">
            <AiOutlineShoppingCart className=" text-cornflower_blue shadow-lg" />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-wrap mt-7">
        <div className="w-full lg:w-7/12 lg:pr-3">
          <div className="w-full bg-ebony_clay p-4 rounded-md">
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              height={350}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
