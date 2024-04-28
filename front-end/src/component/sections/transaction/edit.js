import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import Swal from "sweetalert2";


const EditCategoryForm = ({ onEditComplete , transaction}) => {
  const [formData, setFormData] = useState({
    sourcename: transaction.sourcename,
    amount: transaction.amount,
    frequency: transaction.frequency,
    description: transaction.description,
    transaction_date: transaction.transaction_date,
    type: transaction.type,
  });

  useEffect(() => {
    setFormData({
      sourcename: transaction.sourcename,
      amount: transaction.amount,
      frequency: transaction.frequency,
      description: transaction.description,
      transaction_date: transaction.transaction_date,
      type: transaction.type,
    });
  }, [transaction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/transaction/${transaction.id}`, formData );
  
      onEditComplete();
      console.log("Category added successfully");
  
      Swal.fire({
        icon: "success",
        title: "Category added successfully",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
  
      setFormData({
        sourcename: transaction.sourcename,
        amount: transaction.amount,
        frequency: transaction.frequency,
        description: transaction.description,
        transaction_date: transaction.transaction_date,
        type: transaction.type,
      });
      document.querySelector("#edit_transaction_x").click();
    } catch (error) {
      console.error("Error Editing Transaction:", error.message);
      Swal.fire({
        icon: "error",
        title: "Error Editing Transaction",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };
  
  
  return (
    <div id="edit_transaction" className="modal custom-modal fade" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Transaction</h5>
            <button
              id="edit_transaction_x"
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>


              <div className="form-group">
                <label>
                Source Name<span className="text-danger">*</span>
                </label>
                <input
                  name="sourcename"
                  className="form-control"
                  type="text"
                  value={formData.sourcename}
                  onChange={handleChange}
                />
              </div>



              <div className="form-group">
                <label>
                Frequency <span className="text-danger">*</span>
                </label>
                <select
                  name="frequency"
                  className="form-control"
                  id="movettype"
                  value={formData.frequency}
                  onChange={handleChange}
                >
                  <option value="">--------</option>
                  <option value="onlyOnce">Only Once</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>

              <div className="form-group">
                <label>
                Type <span className="text-danger">*</span>
                </label>
                <select
                  name="type"
                  className="form-control"
                  id="movettype"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="">--------</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>



              <div className="form-group">
                <label>
                Description<span className="text-danger">*</span>
                </label>
                <input
                  name="description"
                  className="form-control"
                  type="text"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>


              <div className="form-group">
                <label>
                Amount <span className="text-danger">*</span>
                </label>
                <input
                  name="amount"
                  className="form-control"
                  type="number"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </div>


              <div className="form-group">
                <label>
                Transaction Date <span className="text-danger">*</span>
                </label>
                <input
                  name="transaction_date"
                  className="form-control"
                  type="date"
                  value={formData.transaction_date}
                  onChange={handleChange}
                />
              </div>



              <div className="submit-section">
                <button
                  type="submit"
                  name="Submit"
                  className="btn btn-primary submit-btn"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryForm;
