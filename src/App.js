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
import Login from "./components/Login";
import Homex from "./pages/Homex";
import Logout from "./pages/Logout.jsx";

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
          <Route path="logout" element={<Logout />} />
        </Route>
        {/* <Route path="/product" element={<Product />} />
          <Route path="/productList" element={<ProductList />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
