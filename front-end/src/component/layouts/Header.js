import React, { createContext, useEffect, useState } from "react";

import { useQuery } from "react-query";
import axios from "../api/axios";
import { SendNotiToUpdateNumber, userdata } from "../Redux/action";
import { useSelector, useDispatch } from "react-redux";
import { Link, json } from "react-router-dom";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { useNavigate } from "react-router-dom";

export default function () {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userData);
  const navigate = useNavigate();
  let imageUrl = "";
  try {
    if (user) {
      const userData = JSON.parse(user);
      imageUrl = userData.image || "";
    }
  } catch (error) {
    console.error("Error parsing user data:", error);
  }

  async function DeleteNotification(id) {
    try {
      const csrfResponse = await axios.get("/get-csrf-token");
      const csrfToken = csrfResponse.data.token;

      axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
      const response = await axios.delete(`/notifications/${id}`);

      return;
    } catch (error) {
      throw new Error("Network response was not ok");
    }
  }

  return (
    <>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, user-scalable=0"
      />
      <meta name="description" content="Smarthr - Bootstrap Admin Template" />
      <meta
        name="keywords"
        content="admin, estimates, bootstrap, business, corporate, creative, management, minimal, modern, accounts, invoice, html5, responsive, CRM, Projects"
      />
      <meta name="author" content="Dreamguys - Bootstrap Admin Template" />
      <meta name="robots" content="noindex, nofollow" />
      <title>Clients - HRMS admin template</title>

      <div className="main-wrapper"></div>

      <div className="header">
        {/* Logo */}
        <div className="header-left">
          <Link to="javascript:void(0)" className="logo">
            <img src="assets/img/main logo.png" width={40} height={40} alt="" />
          </Link>
        </div>
        {/* /Logo */}
        <Link id="toggle_btn" to="javascript:void(0);">
          <span className="bar-icon">
            <span />
            <span />
            <span />
          </span>
        </Link>
        {/* Header Title */}
        <div className="page-title-box">
          <h3>Expense Manager</h3>
        </div>
        {/* /Header Title */}
        <Link id="mobile_btn" className="mobile_btn" to="#sidebar">
          <i className="fa fa-bars" />
        </Link>
        {/* Header Menu */}
        <ul className="nav user-menu">


          <li className="nav-item   main-drop">
            <Link
              to="javascript:void(0)"
              className="dropdown-toggle nav-link"
              data-toggle=""
            >
              <span className="user-img">
                <p>{user ? JSON.parse(user).name : ""}</p>
              </span>
              <span>
                {/*?php echo htmlentities(ucfirst($_SESSION['userlogin']));?*/}
              </span>
            </Link>
            {/* <div className="dropdown-menu">
              <Link
                className="dropdown-item"
                to={`/users/${user ? JSON.parse(user).id : ""}`}
              >
                My Profile
              </Link>
              <Link className="dropdown-item" to="javascript:void(0)">
                Settings
              </Link>
              <Link className="dropdown-item" to="javascript:void(0)">
                Logout
              </Link>
            </div> */}
          </li>
        </ul>
        {/* /Header Menu */}
        {/* Mobile Menu */}
        <div className="dropdown mobile-user-menu">
          <Link
            to="javascript:void(0)"
            className="nav-link dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-ellipsis-v" />
          </Link>
          <div className="dropdown-menu dropdown-menu-right">
            <Link className="dropdown-item" to="javascript:void(0)">
              My Profile
            </Link>
            <Link className="dropdown-item" to="javascript:void(0)">
              Settings
            </Link>
            <Link className="dropdown-item" to="login.php">
              Logout
            </Link>
          </div>
        </div>
        {/* /Mobile Menu */}
      </div>
    </>
  );
}
