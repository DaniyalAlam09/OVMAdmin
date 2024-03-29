import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile";
import ShopOwners from "./pages/ShopOnwers";
import Customers from "./pages/Customers.jsx";
import Product from "./pages/Logout.jsx";
import ProductList from "./pages/ProductList.jsx";
import Subscription from "./pages/Subscription.js";
import Quries from "./pages/Quries.js";
import Login from "./components/Login";
import Homex from "./pages/Homex";
import Logout from "./pages/Logout.jsx";
import BadReviewdShops from "./pages/BadReviewdShops";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route path="admin" element={<Homex />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="customers" element={<Customers />} />
          <Route path="shopowners" element={<ShopOwners />} />
          <Route path="quries" element={<Quries />} />
          <Route path="badreviewdshops" element={<BadReviewdShops />} />
          <Route path="subscription" element={<Subscription />} />
          <Route path="logout" element={<Logout />} />
        </Route>
        {/* <Route path="/product" element={<Product />} />
          <Route path="/productList" element={<ProductList />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
