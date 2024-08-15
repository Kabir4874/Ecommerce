import React, { forwardRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FixedSizeList as List } from "react-window";
import { get_payment_details } from "../../store/reducers/paymentReducer";

function handleOnWheel({ deltaY }) {
  console.log("Scrolled handleWheel", deltaY);
}

const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
));

const PaymentRequest = () => {
  const dispatch = useDispatch();
  const { pendingWithdraws, loader, errorMessage, successMessage } =
    useSelector((state) => state.payment);
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
        <div className="w-[25%] p-2 whitespace-nowrap">
          <button className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-[2px] cursor-pointer text-white rounded-sm text-sm">
            Confirm
          </button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    dispatch(get_payment_details())
  }, []);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-ebony_clay rounded-md text-iron">
        <h2 className="text-xl font-medium pb-5">Withdrawal Request</h2>
        <div className="w-full">
          <div className="w-full overflow-x-auto">
            <div className="flex bg-mirage uppercase text-xs min-w-[340px]">
              <div className="w-[25%] p-2">no</div>
              <div className="w-[25%] p-2">amount</div>
              <div className="w-[25%] p-2">status</div>
              <div className="w-[25%] p-2">date</div>
              <div className="w-[25%] p-2">action</div>
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
  );
};

export default PaymentRequest;
