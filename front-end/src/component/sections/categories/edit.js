import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import Swal from "sweetalert2";

const EditCategoryForm = ({ onEditComplete, cat }) => {
  const [formData, setFormData] = useState({
    categoryname: cat.categoryname,
    type: cat.type,
    budget: cat.budget,
  });

  useEffect(() => {
    setFormData({
      categoryname: cat.categoryname,
      type: cat.type,
      budget: cat.budget,
    });
  }, [cat]);

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    if (selectedImage) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formAdd = new FormData();
      formAdd.append("categoryname", formData.categoryname);
      formAdd.append("type", formData.type);
      formAdd.append("budget", formData.budget);
      if (image) {
        formAdd.append("image", image);
      }

      const response = await axios.post(`/categories/${cat.id}`, formAdd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      onEditComplete();
      console.log("Category Edited successfully");

      Swal.fire({
        icon: "success",
        title: "Category Edited successfully",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      setFormData({
        categoryname: cat.categoryname,
        type: cat.type,
        budget: cat.budget,
      });
      document.querySelector("#edit_category_x").click();
    } catch (error) {
      console.error("Error Edited category:", error.message);
      Swal.fire({
        icon: "error",
        title: "Error Edited category",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  return (
    <div id="edit_category" className="modal custom-modal fade" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Category</h5>
            <button
              id="edit_category_x"
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
                Edit Category Name <span className="text-danger">*</span>
                </label>
                <input
                  name="categoryname"
                  className="form-control"
                  type="text"
                  value={formData.categoryname}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>
                Edit Type <span className="text-danger">*</span>
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
                Edit Budget <span className="text-danger">*</span>
                </label>
                <input
                  name="budget"
                  className="form-control"
                  type="number"
                  value={formData.budget}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>
                  Category Image 
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="imagefiled"
                  accept="image/*"
                  onChange={handleImageChange}
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
