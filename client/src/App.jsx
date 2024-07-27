import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shops from "./pages/Shops";
import Card from "./pages/Card";
import Details from "./pages/Details";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Shipping from "./pages/Shipping";
import { useDispatch } from "react-redux";
import { get_category } from "./store/reducers/homeReducer";
import CategoryShop from "./pages/CategoroyShop";
import SearchProducts from "./pages/SearchProducts";
import Payment from "./pages/Payment";
import ProtectUser from "./utils/ProtectUser";
import Dashboard from "./pages/Dashboard";
import Orders from "./components/dashboard/Orders";
import Wishlist from "./components/dashboard/Wishlist";
import ChangePassword from "./components/dashboard/ChangePassword";
import ClientDashboard from "./components/dashboard/ClientDashboard";
import OrderDetails from "./components/dashboard/OrderDetails";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_category());
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shops" element={<Shops />} />
        <Route path="/products?" element={<CategoryShop />} />
        <Route path="/products/search?" element={<SearchProducts />} />
        <Route path="/card" element={<Card />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/product/details/:slug" element={<Details />} />

        <Route path="/dashboard" element={<ProtectUser />}>
          <Route path="" element={<Dashboard />}>
            <Route path="" element={<ClientDashboard />} />
            <Route path="my-orders" element={<Orders />} />
            <Route path="my-wishlist" element={<Wishlist />} />
            <Route path="order/details/:orderId" element={<OrderDetails />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
