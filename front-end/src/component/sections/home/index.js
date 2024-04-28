import { useEffect, useState } from "react";

import { useQuery } from "react-query";
import axios from "../../api/axios";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FirstChart from "./chart";

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

  const [dataOnlyOnce, setDataOnlyOnce] = useState([]);
  const [dataDaily, setDataDaily] = useState([]);
  const [dataWeekly, setDataWeekly] = useState([]);
  const [dataMonthly, setDataMonthly] = useState([]);
  const [dataYearly, setDataYearly] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchTransactionData();
  }, []);

  const fetchTransactionData = async () => {
    try {
      const response = await axios.get("/TransactionData");
      const responseData = response.data;

      setDataOnlyOnce(responseData.dataOnlyOnce);
      setDataDaily(responseData.dataDaily);
      setDataWeekly(responseData.dataWeekly);
      setDataMonthly(responseData.dataMonthly);
      setDataYearly(responseData.dataYearly);
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
          <div className="chartsty">
            <FirstChart tran={dataDaily ? dataDaily : null} type={"Daily"} />
            <FirstChart tran={dataWeekly ? dataWeekly : null} type={"Weekly"} />
            <FirstChart
              tran={dataMonthly ? dataMonthly : null}
              type={"Monthly"}
            />
            <FirstChart tran={dataYearly ? dataYearly : null} type={"Yearly"} />

            <FirstChart
              tran={dataOnlyOnce ? dataOnlyOnce : null}
              type={"Only Once"}
            />

            {/* <Chart data={dataDaily ? dataDaily : null} /> */}
          </div>
        </div>
        {/* /Page Content */}
      </div>
    </>
  );
}
