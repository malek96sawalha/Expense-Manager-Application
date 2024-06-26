import React, { useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { SendNotiToUpdateNumber, userdata } from "../../Redux/action";
import { useSelector, useDispatch } from "react-redux";

export default function () {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, Setemail] = useState("");
  const [warning, Setwarning] = useState("");
  const [password, Setpassword] = useState("");

  const validateEmailFormat = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const handleEmailChange = (e) => {
    const inputValue = e.target.value;
    Setemail(inputValue);

    if (!validateEmailFormat(inputValue)) {
      Setwarning("⚠️ Please enter a valid email address.");
    } else {
      Setwarning("");
    }
  };
  const handleLogin = async (e) => {
    if (e) {
      e.preventDefault();
    }

    try {
      const csrfResponse = await axios.get("/get-csrf-token");

      const csrfToken = csrfResponse.data.token;

      axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;

      const response = await axios.post("/login", { email, password });

      Setemail("");
      Setpassword("");

      localStorage.setItem("token", csrfToken);
      
      dispatch(userdata(response.data.user));
      window.location.href = "/";
      // navigate("/");
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.message ||
          "An error occurred while processing the request.";

        if (error.response.status === 401) {
          Setwarning(
            " ⚠️ Invalid email or password. Please check your credentials and try again."
          );
        } else {
          Setwarning(errorMessage);
        }
      } else if (error.request) {
        Setwarning(" ⚠️No response received from the server.");
      } else {
        Setwarning(" ⚠️ An error occurred while processing the request.");
      }
    }
  };

  return (
    <>
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
        <title>Login - HRMS admin</title>
        {/* Favicon */}
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="assets/img/main logo.png"
        />
        {/* Bootstrap CSS */}
        <link rel="stylesheet" href="assets/css/bootstrap.min.css" />
        {/* Fontawesome CSS */}
        <link rel="stylesheet" href="assets/css/font-awesome.min.css" />
        {/* Main CSS */}
        <link rel="stylesheet" href="assets/css/style.css" />

        {/* Main Wrapper */}
        <div className="main-wrapper">
          <div className="account-content">
            <div className="container">
              {/* Account Logo */}
              <div className="account-logo">
                <a href="javascript:void(0)">
                  <img src="assets/img/main logo.png" alt="Company Logo" />
                </a>
              </div>
              {/* /Account Logo */}
              <div className="account-box">
                <div className="account-wrapper">
                  <h3 className="account-title"> Login</h3>
                  {/* Account Form */}
                  <form onSubmit={handleLogin}>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        required=""
                        type="text"
                      />
                      {warning && <p className="warning-message">{warning}</p>}
                    </div>
                    <div className="form-group">
                      <div className="row">
                        <div className="col">
                          <label>Password</label>
                        </div>
                      </div>
                      <input
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={(e) => {
                          Setpassword(e.target.value);
                        }}
                        required=""
                        type="password"
                      />
                    </div>
                    <div className="form-group text-center">
                      <button
                        className="btn btn-primary account-btn"
                        name="login"
                        type="submit"
                      >
                        Login
                      </button>
                      {/* <div className="col-auto pt-2">
                        <a
                          className="text-muted float-right"
                          href="forgot-password.php"
                        >
                          Forgot password?
                        </a>
                      </div> */}
                    </div>
                    <div className="account-footer">
                      <p>
                        Don't have an account?{" "}
                        <a
                          target="http://localhost:3000/registration"
                          href="http://localhost:3000/registration"
                        >
                          register
                        </a>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Main Wrapper */}
        {/* jQuery */}
        {/* Bootstrap Core JS */}
        {/* Custom JS */}
      </>
    </>
  );
}
