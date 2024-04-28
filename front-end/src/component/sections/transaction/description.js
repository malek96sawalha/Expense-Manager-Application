import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import Swal from "sweetalert2";


const EditDescriptionForm = ({ onEditComplete , transaction}) => {
  const [formData, setFormData] = useState({
    sourcename: transaction.sourcename,
    description: transaction.description,
  });

  useEffect(() => {
    setFormData({
      sourcename: transaction.sourcename,
      description: transaction.description,
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
      const response = await axios.post(`/transaction/description/${transaction.id}`, formData );
  
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
        description: transaction.description,
      });
      document.querySelector("#edit_description_x").click();
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
    <div id="edit_description" className="modal custom-modal fade" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Transaction</h5>
            <button
              id="edit_description_x"
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

export default EditDescriptionForm;
