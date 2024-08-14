import React, { forwardRef, useEffect } from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FixedSizeList as List } from "react-window";
import { useSelector, useDispatch } from "react-redux";
import { get_seller_payment_details } from "../../store/reducers/paymentReducer";

function handleOnWheel({ deltaY }) {
  console.log("Scrolled handleWheel", deltaY);
}

const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
));

const Payments = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    totalAmount,
    availableAmount,
    pendingAmount,
    withdrawalAmount,
    successWithdraws,
    pendingWithdraws,
    loader,
    errorMessage,
    successMessage,
  } = useSelector((state) => state.payment);
  const Row = ({ index, style }) => {
    return (
      <div className="flex text-sm my-4" style={style}>
        <div className="w-[25%] p-2 whitespace-nowrap">{index + 1}</div>
        <div className="w-[25%] p-2 whitespace-nowrap">$154</div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          <span className="py-[1px] px-[5px] bg-slate-700 text-blue-500 rounded-md text-xs">
            pending
          </span>
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">12 Jun, 2024</div>
      </div>
    );
  };

  useEffect(() => {
    dispatch(get_seller_payment_details(userInfo._id));
  }, []);
  return (
    <div className="px-2 md:px-7 py-5">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="flex justify-between items-center p-5 bg-ebony_clay rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-iron">
            <h2 className="text-lg font-bold">${totalAmount}</h2>
            <span className="text-sm">Total Sales</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-ufo_green flex justify-center items-center text-xl">
            <BsCurrencyDollar className=" text-jungle_green shadow-lg" />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-ebony_clay rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-iron">
            <h2 className="text-lg font-bold">${availableAmount}</h2>
            <span className="text-sm">Available Amount</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-phlox flex justify-center items-center text-xl">
            <BsCurrencyDollar className=" text-electric_violet shadow-lg" />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-ebony_clay rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-iron">
            <h2 className="text-lg font-bold">${withdrawalAmount}</h2>
            <span className="text-sm">Withdrawal Amount</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-dark_turquoise flex justify-center items-center text-xl">
            <BsCurrencyDollar className=" text-robins_egg_blue shadow-lg" />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-ebony_clay rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-iron">
            <h2 className="text-lg font-bold">${pendingAmount}</h2>
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
          <div className="py-5">
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
          <div>
            <h2 className="text-lg pb-4">Pending request</h2>
            <div className="w-full overflow-x-auto">
              <div className="flex bg-mirage uppercase text-xs min-w-[340px]">
                <div className="w-[25%] p-2">no</div>
                <div className="w-[25%] p-2">amount</div>
                <div className="w-[25%] p-2">status</div>
                <div className="w-[25%] p-2">date</div>
              </div>
              {
                <List
                  style={{ minWidth: "340px", overflowX: "hidden" }}
                  className="List"
                  height={550}
                  itemCount={10}
                  itemSize={50}
                  outerElementType={outerElementType}
                >
                  {Row}
                </List>
              }
            </div>
          </div>
        </div>

        <div className=" bg-ebony_clay text-iron rounded-md p-5">
          <div>
            <h2 className="text-lg pb-4">Success Withdrawal</h2>
            <div className="w-full overflow-x-auto">
              <div className="flex bg-mirage uppercase text-xs min-w-[340px]">
                <div className="w-[25%] p-2">no</div>
                <div className="w-[25%] p-2">amount</div>
                <div className="w-[25%] p-2">status</div>
                <div className="w-[25%] p-2">date</div>
              </div>
              {
                <List
                  style={{ minWidth: "340px", overflowX: "hidden" }}
                  className="List"
                  height={550}
                  itemCount={10}
                  itemSize={50}
                  outerElementType={outerElementType}
                >
                  {Row}
                </List>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
