import authReducer from "./reducers/authReducer";
import categoryReducer from "./reducers/categoryReducer";
import chatReducer from "./reducers/chatReducer";
import dashboardIndexReducer from "./reducers/dashboardIndexReducer";
import orderReducer from "./reducers/orderReducer";
import paymentReducer from "./reducers/paymentReducer";
import productReducer from "./reducers/productReducer";
import sellerReducer from "./reducers/sellerReducer";
const rootReducer = {
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
  seller: sellerReducer,
  chat: chatReducer,
  order: orderReducer,
  payment: paymentReducer,
  dashboardIndex: dashboardIndexReducer
};
export default rootReducer;
