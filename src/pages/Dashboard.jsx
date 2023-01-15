import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import "./style.css";

function Dashboard() {
  const [user, setUser] = useState("");
  const [shop, setShop] = useState("");
  const fetchUsers = () => {
    fetch("http://localhost:4000/admins/viewcustomers")
      .then((response) => response.json())
      .then((actualData) => {
        setUser(actualData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const fetchShops = () => {
    fetch("http://localhost:4000/admins/viewshopowners")
      .then((response) => response.json())
      .then((actualData) => {
        setShop(actualData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    fetchUsers();
    fetchShops();
  }, []);
  return (
    <>
      <div className="container mt-5 row d-flex ">
        <div className="block card text-center pt-4 m-3">
          <h5 className="block-text">Total Customers</h5>
          <p className="block-text block-p">
            {" "}
            <CountUp end={user.length} duration={1} />
          </p>
        </div>
        <div className="block card text-center pt-4 m-3">
          <h5 className="block-text">Total Shops</h5>
          <p className="block-text block-p">
            {" "}
            <CountUp end={shop.length} duration={1} />
          </p>
        </div>
      </div>
      
    </>
  );
}

export default Dashboard;
