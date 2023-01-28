import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ShopIcon from "@mui/icons-material/Shop";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReorderIcon from "@mui/icons-material/Reorder";
import LogoutIcon from "@mui/icons-material/Logout";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "dashboard",
      name: "Dashboard",
      icon: <DashboardIcon />,
    },
    {
      path: "profile",
      name: "Profile",
      icon: <AccountCircleIcon />,
    },
    {
      path: "customers",
      name: "Customers",
      icon: <PersonSearchIcon />,
    },
    {
      path: "shopowners",
      name: "Shop Owners",
      icon: <ShopIcon />,
    },
    {
      path: "badreviewdshops",
      name: "Bad Reviewd Products",
      icon: <ThumbDownOffAltIcon />,
    },
    {
      path: "quries",
      name: "Quries",
      icon: <ContactEmergencyIcon />,
    },
    {
      path: "subscription",
      name: "Subscription",
      icon: <SubscriptionsIcon />,
    },
    {
      path: "logout",
      name: "Logout",
      icon: <LogoutIcon />,
    },
  ];
  return (
    <div className="contain">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            OVM
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <ReorderIcon onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
