import React, { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FixedSizeList as List } from "react-window";
import {
  get_payment_request,
  confirm_payment_request,
  messageClear,
} from "../../store/reducers/paymentReducer";
import { toast } from "react-hot-toast";
import moment from "moment";

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

  useEffect(() => {
    dispatch(get_payment_request());
  }, []);
  const [paymentId, setPaymentId] = useState("");

  const confirm_request = (id) => {
    setPaymentId(id);
    dispatch(confirm_payment_request(id));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
    if (errorMessage) {
      toast.error(errorMessage);
    }
    dispatch(messageClear());
  }, [successMessage, errorMessage]);

  const Row = ({ index, style }) => {
    return (
      <div className="flex text-sm my-4" style={style}>
        <div className="w-[25%] p-2 whitespace-nowrap">{index + 1}</div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          ${pendingWithdraws[index]?.amount}
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          <span className="py-[1px] px-[5px] bg-slate-700 text-blue-500 rounded-md text-xs">
            {pendingWithdraws[index]?.status}
          </span>
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          {moment(pendingWithdraws[index]?.createdAt).format("LL")}
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          <button
            disabled={loader}
            onClick={() => confirm_request(pendingWithdraws[index]?._id)}
            className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-[2px] cursor-pointer text-white rounded-sm text-sm"
          >
            {loader && paymentId === pendingWithdraws[index]?._id
              ? "Loading..."
              : "Confirm"}
          </button>
        </div>
      </div>
    );
  };

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
                itemCount={pendingWithdraws.length}
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
