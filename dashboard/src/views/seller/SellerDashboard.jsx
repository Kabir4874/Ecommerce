import React, { useEffect } from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { RiProductHuntLine } from "react-icons/ri";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'
import { get_seller_dashboard_index_data } from "../../store/reducers/dashboardIndexReducer";
const SellerDashboard = () => {
  const dispatch= useDispatch();
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
        name: "Sales",
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
      responsive: [
        {
          breakpoint: 565,
          yaxis: {
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
          options: {
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
            chart: {
              height: "550px",
            },
          },
        },
      ],
    },
  };

  useEffect(()=>{
    dispatch(get_seller_dashboard_index_data());
  },[])
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
            <span className="text-md font-medium">Orders</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-dark_turquoise flex justify-center items-center text-xl">
            <AiOutlineShoppingCart className=" text-robins_egg_blue shadow-lg" />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-ebony_clay rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-iron">
            <h2 className="text-3xl font-bold">12</h2>
            <span className="text-md font-medium">Pending Orders</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-old_lavender flex justify-center items-center text-xl">
            <AiOutlineShoppingCart className=" text-electric_violet shadow-lg" />
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
        <div className="w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0">
          <div className="w-full bg-ebony_clay p-4 rounded-md text-iron">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg pb-3">
                Recent customer message
              </h2>
              <Link className=" font-semibold text-sm">View All</Link>
            </div>
            <div className="flex flex-col gap-2 pt-6">
              <ol className=" relative border border-slate-600 ml-4">
                <li className="mb-3 ml-6">
                  <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-dark_turquoise2 rounded-full z-10">
                    <img
                      src="http://localhost:3000/images/admin.jpg"
                      alt=""
                      className="w-full rounded-full h-full shadow-lg"
                    />
                  </div>
                  <div className="p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-sm">
                    <div className="flex justify-between items-center">
                      <Link className="text-md">Admin</Link>
                      <time
                        datetime=""
                        className="mb-1 text-sm sm:order-last sm:mb-0"
                      >
                        4 day ago
                      </time>
                    </div>
                    <div className="p-2 text-xs bg-slate-700 rounded-lg border border-slate-800">
                      How are you
                    </div>
                  </div>
                </li>
                <li className="mb-3 ml-6">
                  <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-dark_turquoise2 rounded-full z-10">
                    <img
                      src="http://localhost:3000/images/admin.jpg"
                      alt=""
                      className="w-full rounded-full h-full shadow-lg"
                    />
                  </div>
                  <div className="p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-sm">
                    <div className="flex justify-between items-center">
                      <Link className="text-md">Admin</Link>
                      <time
                        datetime=""
                        className="mb-1 text-sm sm:order-last sm:mb-0"
                      >
                        4 day ago
                      </time>
                    </div>
                    <div className="p-2 text-xs bg-slate-700 rounded-lg border border-slate-800">
                      How are you
                    </div>
                  </div>
                </li>
                <li className="mb-3 ml-6">
                  <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-dark_turquoise2 rounded-full z-10">
                    <img
                      src="http://localhost:3000/images/admin.jpg"
                      alt=""
                      className="w-full rounded-full h-full shadow-lg"
                    />
                  </div>
                  <div className="p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-sm">
                    <div className="flex justify-between items-center">
                      <Link className="text-md">Admin</Link>
                      <time
                        datetime=""
                        className="mb-1 text-sm sm:order-last sm:mb-0"
                      >
                        4 day ago
                      </time>
                    </div>
                    <div className="p-2 text-xs bg-slate-700 rounded-lg border border-slate-800">
                      How are you
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-4 bg-ebony_clay rounded-md mt-6">
        <div className="flex justify-between items-center">
          <h2 className=" font-semibold text-lg text-iron pb-3">
            Recent Orders
          </h2>
          <Link className=" font-semibold text-sm text-iron">View All</Link>
        </div>
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
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((d, i) => (
                <tr key={i}>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    #adlfkj3lfk323
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    $565
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    <span>pending</span>
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    <span>pending</span>
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    <Link>View</Link>
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
export default SellerDashboard;
