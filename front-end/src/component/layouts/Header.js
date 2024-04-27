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
          <Link to="index.php" className="logo">
            <img src="assets/img/logo.png" width={40} height={40} alt="" />
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
          <h3>Releans</h3>
        </div>
        {/* /Header Title */}
        <Link id="mobile_btn" className="mobile_btn" to="#sidebar">
          <i className="fa fa-bars" />
        </Link>
        {/* Header Menu */}
        <ul className="nav user-menu">
          {/* Search */}
          <li className="nav-item">
            <div className="top-nav-search">
              <Link to="javascript:void(0);" className="responsive-search">
                <i className="fa fa-search" />
              </Link>
              <form action="search.php">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search here"
                />
                <button className="btn" type="submit">
                  <i className="fa fa-search" />
                </button>
              </form>
            </div>
          </li>
          {/* /Search */}
          {/* Notifications */}
          <li className="nav-item dropdown">
            <Link
              to="javascript:void(0)"
              className="dropdown-toggle nav-link"
              data-toggle="dropdown"
              id="MakeNotiOpen"
            >
              <i className="fa fa-bell-o" />
              <span className="badge badge-pill">2</span>
            </Link>
            <div className="dropdown-menu notifications">
              <div className="topnav-dropdown-header">
                <span className="notification-title">Notifications</span>
                <Link className="clear-noti">Clear All</Link>
              </div>
              <div className="noti-content">
                <ul className="notification-list">
                  <></>
                </ul>
              </div>
              <div className="topnav-dropdown-footer">
                <Link to="javascript:void(0)">View all Notifications</Link>
              </div>
            </div>
          </li>
          {/* /Notifications */}
          {/* Message Notifications */}
          <li className="nav-item dropdown">
            <Link
              to="javascript:void(0)"
              className="dropdown-toggle nav-link"
              data-toggle="dropdown"
            >
              <i className="fa fa-comment-o" />{" "}
              <span className="badge badge-pill">8</span>
            </Link>
            <div className="dropdown-menu notifications">
              <div className="topnav-dropdown-header">
                <span className="notification-title">Messages</span>
                <Link to="javascript:void(0)" className="clear-noti">
                  {" "}
                  Clear All{" "}
                </Link>
              </div>
              <div className="noti-content">
                <ul className="notification-list">
                  <li className="notification-message">
                    <Link>
                      <div className="list-item">
                        <div className="list-left">
                          <span className="avatar">
                            <img
                              alt=""
                              src="assets/img/profiles/avatar-09.jpg"
                            />
                          </span>
                        </div>
                        <div className="list-body">
                          <span className="message-author">Richard Miles </span>
                          <span className="message-time">12:28 AM</span>
                          <div className="clearfix" />
                          <span className="message-content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="notification-message">
                    <Link to="javascript:void(0)">
                      <div className="list-item">
                        <div className="list-left">
                          <span className="avatar">
                            <img
                              alt=""
                              src="assets/img/profiles/avatar-02.jpg"
                            />
                          </span>
                        </div>
                        <div className="list-body">
                          <span className="message-author">John Doe</span>
                          <span className="message-time">6 Mar</span>
                          <div className="clearfix" />
                          <span className="message-content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="notification-message">
                    <Link to="javascript:void(0)">
                      <div className="list-item">
                        <div className="list-left">
                          <span className="avatar">
                            <img
                              alt=""
                              src="assets/img/profiles/avatar-03.jpg"
                            />
                          </span>
                        </div>
                        <div className="list-body">
                          <span className="message-author">
                            {" "}
                            Tarah Shropshire{" "}
                          </span>
                          <span className="message-time">5 Mar</span>
                          <div className="clearfix" />
                          <span className="message-content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="notification-message">
                    <Link to="javascript:void(0)">
                      <div className="list-item">
                        <div className="list-left">
                          <span className="avatar">
                            <img
                              alt=""
                              src="assets/img/profiles/avatar-05.jpg"
                            />
                          </span>
                        </div>
                        <div className="list-body">
                          <span className="message-author">Mike Litorus</span>
                          <span className="message-time">3 Mar</span>
                          <div className="clearfix" />
                          <span className="message-content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="notification-message">
                    <Link to="javascript:void(0)">
                      <div className="list-item">
                        <div className="list-left">
                          <span className="avatar">
                            <img
                              alt=""
                              src="assets/img/profiles/avatar-08.jpg"
                            />
                          </span>
                        </div>
                        <div className="list-body">
                          <span className="message-author">
                            {" "}
                            Catherine Manseau{" "}
                          </span>
                          <span className="message-time">27 Feb</span>
                          <div className="clearfix" />
                          <span className="message-content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="topnav-dropdown-footer">
                <Link to="javascript:void(0)">View all Messages</Link>
              </div>
            </div>
          </li>
          {/* /Message Notifications */}

          <li className="nav-item dropdown has-arrow main-drop">
            <Link
              to="javascript:void(0)"
              className="dropdown-toggle nav-link"
              data-toggle="dropdown"
            >
              <span className="user-img">
                <img src={`${imageUrl}`} alt="User Picture" />

                <span className="status online" />
              </span>
              <span>
                {/*?php echo htmlentities(ucfirst($_SESSION['userlogin']));?*/}
              </span>
            </Link>
            <div className="dropdown-menu">
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
            </div>
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
