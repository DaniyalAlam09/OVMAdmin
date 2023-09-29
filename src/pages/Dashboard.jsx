import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState("");
  const [shop, setShop] = useState("");
  const [products, setProducts] = useState("");
  const [quires, setQuries] = useState("");
  const [subscription, setSubscription] = useState("");
  const [orders, setOrders] = useState("");
  const fetchUsers = () => {
    fetch("https://red-gorgeous-bandicoot.cyclic.app/admins/viewcustomers")
      .then((response) => response.json())
      .then((actualData) => {
        setUser(actualData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const fetchShops = () => {
    fetch("https://red-gorgeous-bandicoot.cyclic.app/admins/viewshopowners")
      .then((response) => response.json())
      .then((actualData) => {
        setShop(actualData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const fetchProducts = () => {
    fetch("https://red-gorgeous-bandicoot.cyclic.app/shopowners/viewproducts")
      .then((response) => response.json())
      .then((actualData) => {
        setProducts(actualData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const fetchQuries = () => {
    fetch("https://red-gorgeous-bandicoot.cyclic.app/admins/quries")
      .then((response) => response.json())
      .then((actualData) => {
        setQuries(actualData);
        console.log(actualData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const fetchSubscription = () => {
    fetch("https://red-gorgeous-bandicoot.cyclic.app/admins/viewsubscriptions")
      .then((response) => response.json())
      .then((actualData) => {
        setSubscription(actualData);
        console.log(actualData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const fetchOrders = () => {
    fetch("https://red-gorgeous-bandicoot.cyclic.app/order/allorders")
      .then((response) => response.json())
      .then((actualData) => {
        setOrders(actualData);
        console.log(actualData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    fetchUsers();
    fetchShops();
    fetchProducts();
    fetchQuries();
    fetchSubscription();
    fetchOrders();
  }, []);
  return (
    <div className="col">
      <div className="container mt-5 d-flex justify-content-around">
        <Link
          to="/admin/customers"
          className="block border text-center pt-4 m-3"
          style={{
            height: "150px",
            width: "300px",
            backgroundColor: "#CEEFFC",
          }}
        >
          <h5 className="block-text text-dark">Total Registered Users</h5>
          <p className="block-text block-p">
            {" "}
            <CountUp end={user.length} duration={1} />
          </p>
        </Link>
        <Link
          to="/admin/shopowners"
          className="block border text-center pt-4 m-3"
          style={{
            height: "150px",
            width: "300px",
            backgroundColor: "#CEEFFC",
          }}
        >
          <h5 className="block-text text-dark">Total Registerd Shops</h5>
          <p className="block-text block-p">
            {" "}
            <CountUp end={shop.length} duration={1} />
          </p>
        </Link>
        <a
          href={`http://localhost:3000/products`}
          target="_blank"
          className="block border text-center pt-4 m-3"
          style={{
            height: "150px",
            width: "300px",
            backgroundColor: "#CEEFFC",
          }}
        >
          <h5 className="block-text text-dark">Total Live Products</h5>
          <p className="block-text block-p">
            {" "}
            <CountUp end={products.length} duration={1} />
          </p>
        </a>
      </div>
      <br />
      <div className="container mt-5 d-flex justify-content-around">
        <Link
          to="/admin/quries"
          className="block border text-center pt-4 m-3"
          style={{
            height: "150px",
            width: "300px",
            backgroundColor: "#CEEFFC",
          }}
        >
          <h5 className="block-text text-dark">Total Quries</h5>
          <p className="block-text block-p">
            {" "}
            <CountUp end={quires.length} duration={1} />
          </p>
        </Link>
        <Link
          to="/admin/subscription"
          className="block border text-center pt-4 m-3"
          style={{
            height: "150px",
            width: "300px",
            backgroundColor: "#CEEFFC",
          }}
        >
          <h5 className="block-text text-dark">Total Subscribe</h5>
          <p className="block-text block-p">
            {" "}
            <CountUp end={subscription.length} duration={1} />
          </p>
        </Link>
        <div
          className="block border text-center pt-4 m-3"
          style={{
            height: "150px",
            width: "300px",
            backgroundColor: "#CEEFFC",
          }}
        >
          <h5 className="block-text text-dark">Total Orders</h5>
          <p className="block-text block-p">
            {" "}
            <CountUp end={orders?.length} duration={1} />
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
