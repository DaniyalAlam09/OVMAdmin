import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";

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
    <div className=" mt-5 ml-5">
      <button
        className="buttons btn text-white btn-block"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
