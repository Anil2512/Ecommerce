import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddProduct() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    old_price: "",
    stock: "",
    image: "",
    status: "Active"
  });

  const [loading, setLoading] = useState(false);

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const response = await axios.post(
        "http://localhost:5000/api/products",
        {
          ...formData,
          price: Number(formData.price),
          old_price: formData.old_price
            ? Number(formData.old_price)
            : null,
          stock: Number(formData.stock)
        }
      );
        console.log(
        "Product Added:",
        response.data
      );

      alert("Product added successfully!");

      navigate("/admin/products");

    } catch (error) {

      console.error(
        "Add Product Error:",
        error.response?.data || error.message
      );
      alert(
        error.response?.data?.message ||
        "Product add failed"
      );

    } finally {

      setLoading(false);

    }

  };
  return (

    <div>

      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold mb-1">
            Add Product
          </h2>

          <p className="text-muted mb-0">
            Add a new product to your store
          </p>

        </div>

        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() =>
            navigate("/admin/products")
          }
        >

          <i className="bi bi-arrow-left me-2"></i>

          Back

        </button>

      </div>

     {/* ====== FORM======== */}

      <div className="card border-0 shadow-sm">

        <div className="card-body p-4">

         <form onSubmit={handleSubmit}>

            <div className="row g-4">

              {/* PRODUCT NAME */}

              <div className="col-md-8">

                <label className="form-label fw-semibold">
                  Product Name
                </label>

                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* CATEGORY */}

              <div className="col-md-4">

                <label className="form-label fw-semibold">
                  Category
                </label>

                <select  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleChange}
                  required>

                  <option value="">
                    Select Category
                  </option>

                  <option value="Electronics">
                    Electronics
                  </option>

                  <option value="Fashion">
                    Fashion
                  </option>

                  <option value="Home & Kitchen">
                    Home & Kitchen
                  </option>

                  <option value="Beauty">
                    Beauty
                  </option>

                  <option value="Sports">
                    Sports
                  </option>

                  <option value="Books">
                    Books
                  </option>

                </select>

              </div>

              {/* DESCRIPTION */}

              <div className="col-12">

                <label className="form-label fw-semibold">
                  Description
                </label>

                <textarea
                  name="description"
                  className="form-control"
                  rows="5"
                  placeholder="Enter product description"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>

              </div>


              {/* PRICE */}

              <div className="col-md-4">

                <label className="form-label fw-semibold">
                  Price
                </label>

                <div className="input-group">

                  <span className="input-group-text">
                    ₹
                  </span>

                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    placeholder="3999"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    required />

                </div>

              </div>

              {/* OLD PRICE */}

              <div className="col-md-4">

                <label className="form-label fw-semibold">
                  Old Price
                </label>

                <div className="input-group">

                  <span className="input-group-text">
                    ₹
                  </span>

                  <input
                    type="number"
                    name="old_price"
                    className="form-control"
                    placeholder="4999"
                    value={formData.old_price}
                    onChange={handleChange}
                    min="0" />

                </div>

              </div>

              {/* STOCK */}

              <div className="col-md-4">

                <label className="form-label fw-semibold">
                  Stock
                </label>

                <input
                  type="number"
                  name="stock"
                  className="form-control"
                  placeholder="20"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0"
                  required
                />

              </div>
              {/* IMAGE */}

              <div className="col-md-8">

                <label className="form-label fw-semibold">
                  Product Image URL
                </label>

                <input
                  type="url"
                  name="image"
                  className="form-control"
                  placeholder="https://example.com/product.jpg"
                  value={formData.image}
                  onChange={handleChange}
                />

                <small className="text-muted">
                  Enter the public image URL
                </small>

              </div>

              {/* STATUS */}

              <div className="col-md-4">

                <label className="form-label fw-semibold">
                  Status
                </label>

                <select
                  name="status"
                  className="form-select"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>

                </select>

              </div>

              {/* PREVIEW */}

              {formData.image && (

                <div className="col-12">

                  <div className="border rounded p-3">

                    <label className="form-label fw-semibold">
                      Image Preview
                    </label>

                    <div>

                      <img
                        src={formData.image}
                        alt="Preview"
                        className="img-thumbnail"
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "contain"
                        }}
                        onError={(e) => {
                          e.target.style.display =
                            "none";
                        }}
                      />

                    </div>

                  </div>

                </div>
             )}

             {/* BUTTONS */}

              <div className="col-12">

                <hr />

                <div className="d-flex gap-2 justify-content-end">

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() =>
                      navigate("/admin/products")
                    }
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn btn-warning fw-semibold px-4"
                    disabled={loading}
                  >
                   {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                        ></span>
                        Saving...
                     </>
                    ) : (
                      <>
                        <i className="bi bi-check-lg me-2"></i>
                        Add Product
                      </>
                    )}
                  </button>
                </div>

              </div>

            </div>

          </form>

        </div>

      </div>

    </div>

  );
}
export default AddProduct;