import React, { useState, useContext } from "react";
import { useQuery } from "react-query";
import axios from "../../api/axios";
import Add from "./add";
import Edit from "./edit";
import Description from "./description";
import Delete from "./delete";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const fetchCategories = async () => {
  try {
    const response = await axios.get("/transaction");
    return response.data;
  } catch (error) {
    throw new Error("Network response was not ok");
  }
};

export default function () {
  const userInfo = useSelector((state) => state.userData);
  const [editpage, seteditpage] = useState(false);
  const [descriptionPage, setdescriptionPage] = useState(false);
  const [deletePage, setdeletePage] = useState(false);

  const {
    data: transactions,
    isLoading,
    error,
    refetch,
  } = useQuery("transactions", fetchCategories);

  const handleRefetch = () => {
    refetch();
  };
  console.log(transactions);

  if (isLoading)
    return (
      <div>
        <Box sx={{ width: "100%" }} height={208} style={{ marginTop: "60px" }}>
          <Skeleton animation="wave" height={"100vh"} />
        </Box>
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Transaction</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="index.php">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Transaction</li>
                </ul>
              </div>
              {userInfo && JSON.parse(userInfo).role !== "regular" && (
                <div className="col-auto float-right ml-auto">
                  <Link
                    to="javascript:void(0)"
                    className="btn add-btn"
                    data-toggle="modal"
                    data-target="#add_category"
                  >
                    <i className="fa fa-plus" /> Add Transaction
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <table className="table table-striped custom-table mb-0 datatable">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Type</th>
                      <th>Source</th>
                      <th>Frequency</th>
                      <th>Description</th>
                      <th>Balnce Before</th>
                      <th>Amount</th>
                      <th>Rest</th>
                      <th>Transaction_date</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.transactions &&
                      transactions.transactions.map((transaction, index) => (
                        <tr key={transaction.id}>
                          <td>
                            <h2 className="table-avatar">
                              <img
                                className="avatar"
                                alt=""
                                src={`http://localhost:8000/${transaction.category.image}`}
                              />
                              <Link href="javascript:void(0)">
                                {transaction.category.categoryname}
                              </Link>
                            </h2>
                          </td>

                          <td>{transaction.type}</td>
                          <td>{transaction.sourcename}</td>
                          <td>{transaction.frequency}</td>
                          <td>{transaction.description}</td>
                          <td>{transaction.balncebefore}</td>
                          <td>{transaction.amount}</td>
                          <td>{transaction.rest}</td>
                          <td>{transaction.transaction_date}</td>

                          <td className="text-right">
                            <div className="dropdown dropdown-action">
                              <Link
                                to="javascript:void(0)"
                                className="action-icon dropdown-toggle"
                                data-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="material-icons">more_vert</i>
                              </Link>
                              <div className="dropdown-menu dropdown-menu-right">
                                {index ===
                                transactions.transactions.length - 1 ? (
                                  <Link
                                    className="dropdown-item"
                                    to="javascript:void(0)"
                                    data-toggle="modal"
                                    data-target="#edit_transaction"
                                    data-id={transaction.id}
                                    onClick={() => {
                                      seteditpage(transaction);
                                    }}
                                  >
                                    <i className="fa fa-pencil m-r-5" /> Edit
                                  </Link>
                                ) : (
                                  <Link
                                    className="dropdown-item"
                                    to="javascript:void(0)"
                                    data-toggle="modal"
                                    data-target="#edit_description"
                                    data-id={transaction.id}
                                    onClick={() => {
                                      setdescriptionPage(transaction);
                                    }}
                                  >
                                    <i className="fa fa-pencil m-r-5" /> Edit
                                  </Link>
                                )}

                                <Link
                                  className="dropdown-item"
                                  to="javascript:void(0)"
                                  data-toggle="modal"
                                  data-target="#delete_approve"
                                  onClick={() => {
                                    setdeletePage(transaction.id);
                                  }}
                                >
                                  <i className="fa fa-trash-o m-r-5" /> Delete
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Add onEditComplete={handleRefetch} allCat={transactions.allCategories} />
      {editpage && (
        <Edit
          transaction={editpage}
          allCat={transactions.allCategories}
          onEditComplete={handleRefetch}
        />
      )}
      {editpage && (
        <Description
          transaction={descriptionPage}
          onEditComplete={handleRefetch}
        />
      )}
      {deletePage && <Delete id={deletePage} onEditComplete={handleRefetch} />}
    </>
  );
}
