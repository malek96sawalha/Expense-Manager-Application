import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { store } from "./component/Redux/store";
import "./index.css";
import Home from "./component/pages/index";
import Product from "./component/pages/products";
import Login from "./component/pages/login";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();
const accessToken = localStorage.getItem("token") !== null;

root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={accessToken ? <Home /> : <Navigate to="/login" />}
          />

          <Route
            path="/products"
            element={accessToken ? <Product /> : <Navigate to="/login" />}
          />

          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>
);

reportWebVitals();
