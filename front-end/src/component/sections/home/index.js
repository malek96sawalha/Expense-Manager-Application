import { useEffect, useState } from "react";

import { useQuery } from "react-query";
import axios from "../../api/axios";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FirstChart from "./1chart";
import Chart from "./chart2";
const fetchCollection = async () => {
  try {
    const response = await axios.get(`/TransactionData`);
    return response.data;
  } catch (error) {
    throw new Error("Network response was not ok");
  }
};

export default function () {
  const user = useSelector((state) => state.userData);

  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchTransactionData();
  }, []);

  const fetchTransactionData = async () => {
    try {
      const response = await axios.get("/TransactionData");
      const responseData = response.data;
      setData(responseData.data);
      setCategories(responseData.categories);
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    }
  };

  return (
    <>
      <div className="page-wrapper">
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title"></h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item active">Dashboard</li>
                </ul>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <FirstChart data={data ? data : null} />
          <Chart data={data ? data : null} />
        </div>
        {/* /Page Content */}
      </div>
    </>
  );
}
