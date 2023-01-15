import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import warning from "../Assests//Warning.png";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    axios
      .get("http://localhost:4000/users/logout", config)
      .then((response) => {
        console.log(response.data);

        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div
      className="  d-flex align-items-center justify-content-center"
      style={{ width: "100%" }}
    >
      <div>
        <img
          src={warning}
          style={{
            height: "200px",
            // width: "200px",
            marginBottom: "50px",
          }}
          class="product-image"
          alt="Warning"
        />
        <h6 style={{ marginBottom: "30px" }}>Are You Sure To Logout?</h6>
        <button
          className="buttons btn text-white btn-block"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
