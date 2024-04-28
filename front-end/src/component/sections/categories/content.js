import React, { useState, useContext } from "react";
import { useQuery } from "react-query";
import axios from "../../api/axios";
import Add from "./add";
import Edit from "./edit";
import Delete from "./delete";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const fetchCategories = async () => {
  try {
    const response = await axios.get("/categories");
    console.log(response.data.categories);
    return response.data.categories;
  } catch (error) {
    throw new Error("Network response was not ok");
  }
};

export default function () {
  const userInfo = useSelector((state) => state.userData);
  const [editpage, seteditpage] = useState(false);
  const [deletePage, setdeletePage] = useState(false);

  const { data: categories, isLoading, error, refetch } = useQuery(
    "categories",
    fetchCategories
  );

  const handleRefetch = () => {
    refetch();
  };

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
                <h3 className="page-title">Categories</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="index.php">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Categories</li>
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
                    <i className="fa fa-plus" /> Add Category
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
                      <th>Category Name</th>
                      <th>Type</th>
                      <th>Budget</th>
                      <th>Image</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories &&
                      categories.map((category) => (
                        <tr key={category.id}>
                          <td>{category.categoryname}</td>
                          <td>{category.type}</td>
                          <td>{category.budget}</td>
                          <td>
                            <img
                              src={`http://localhost:8000/${category.image}`}
                              style={{ height: '100px' }}
                              alt=""
                            />
                          </td>
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
                                  
                                    <Link
                                      className="dropdown-item"
                                      to="javascript:void(0)"
                                      data-toggle="modal"
                                      data-target="#edit_category"
                                      data-id={category.id}
                                      onClick={() => {
                                        seteditpage(category);
                                      }}
                                    >
                                      <i className="fa fa-pencil m-r-5" /> Edit
                                    </Link>
                                    <Link
                                      className="dropdown-item"
                                      to="javascript:void(0)"
                                      data-toggle="modal"
                                      data-target="#delete_approve"
                                      onClick={() => {
                                        setdeletePage(category.id);
                                      }}
                                    >
                                      <i className="fa fa-trash-o m-r-5" />{" "}
                                      Delete
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
      <Add onEditComplete={handleRefetch} />
      {editpage && <Edit cat={editpage}  onEditComplete={handleRefetch} />}
      {deletePage && <Delete id={deletePage} onEditComplete={handleRefetch} />}
    </>
  );
}
