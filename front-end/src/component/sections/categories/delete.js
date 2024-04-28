import { Link } from "react-router-dom";
import axios from "../../api/axios";
import Swal from "sweetalert2";

export default function ({ id, onEditComplete }) {
  const deleteProduct = async () => {
    try {
      const csrfResponse = await axios.get("/get-csrf-token");
      const csrfToken = csrfResponse.data.token;

      axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
      const response = await axios.delete(`/deleteCategories/${id}`);
      console.log("response", response);
      onEditComplete();
      document.querySelector("#delete_cancel").click();
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Category Deleted successfully",
      });
      return response.data;
    } catch (error) {
      throw new Error("Network response was not ok");
    }
  };

  return (
    <>
      <div
        className={`modal custom-modal fade show`}
        id="delete_approve"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Delete Category</h3>
                <p>Are you sure want to delete this Category?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <Link
                      className="btn btn-primary continue-btn"
                      onClick={() => {
                        deleteProduct();
                      }}
                    >
                      Delete
                    </Link>
                  </div>
                  <div className="col-6">
                    <Link
                    id="delete_cancel"
                      to="javascript:void(0);"
                      data-dismiss="modal"
                      className="btn btn-primary cancel-btn"
                    >
                      Cancel
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
