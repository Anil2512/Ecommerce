import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditProduct() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    old_price: "",
    stock: "",
    image: "",
    imageFile: null,
    status: "Active"
  });


  // =========================
  // INPUT CHANGE
  // =========================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

  };


  // =========================
  // IMAGE CHANGE
  // =========================

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      imageFile: file
    }));

  };


  // =========================
  // GET PRODUCT
  // =========================

  useEffect(() => {

    const getProduct = async () => {

      try {

        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );

        const product =
          response.data.product ||
          response.data;

        setFormData({
          name: product.name || "",
          category: product.category || "",
          description: product.description || "",
          price: product.price || "",
          old_price: product.old_price || "",
          stock: product.stock || "",
          image: product.image || "",
          imageFile: null,
          status: product.status || "Active"
        });

      } catch (error) {

        console.error(
          "Get Product Error:",
          error.response?.data ||
          error.message
        );

        alert("Product load failed");

      } finally {

        setLoading(false);

      }

    };

    getProduct();

  }, [id]);


  // =========================
  // UPDATE PRODUCT
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const data = new FormData();

      data.append(
        "name",
        formData.name
      );

      data.append(
        "category",
        formData.category
      );

      data.append(
        "price",
        formData.price
      );

      data.append(
        "old_price",
        formData.old_price
      );

      data.append(
        "stock",
        formData.stock
      );

      data.append(
        "description",
        formData.description
      );

      data.append(
        "status",
        formData.status
      );


      // =========================
      // IMAGE URL
      // =========================

      if (
        formData.image &&
        typeof formData.image === "string"
      ) {

        data.append(
          "image",
          formData.image
        );

      }


      // =========================
      // IMAGE FILE
      // =========================

      if (formData.imageFile) {

        data.append(
          "imageFile",
          formData.imageFile
        );

      }


      // =========================
      // PUT REQUEST
      // =========================

      await axios.put(
        `http://localhost:5000/api/products/${id}`,
        data
      );


      alert(
        "Product updated successfully"
      );


      navigate("/admin/products");


    } catch (error) {

      console.error(
        "Update Product Error:",
        error.response?.data ||
        error.message
      );

      alert(
        "Product update failed"
      );

    }

  };


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <div className="text-center py-5">

        <div
          className="spinner-border text-warning"
        ></div>

        <p className="text-muted mt-3">
          Loading product...
        </p>

      </div>

    );

  }


  return (

    <div>

      {/* HEADER */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold mb-1">
            Edit Product
          </h2>

          <p className="text-muted mb-0">
            Update product information
          </p>

        </div>


        <button
          className="btn btn-outline-secondary"
          onClick={() =>
            navigate("/admin/products")
          }
        >

          <i className="bi bi-arrow-left me-2"></i>

          Back

        </button>

      </div>


      {/* FORM */}

      <div className="card border-0 shadow-sm">

        <div className="card-body p-4">

          <form onSubmit={handleSubmit}>

            <div className="row g-4">


              {/* NAME */}

              <div className="col-md-8">

                <label className="form-label fw-semibold">
                  Product Name
                </label>

                <input
                  type="text"
                  name="name"
                  className="form-control"
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

                <select
                  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >

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
                  rows="5"
                  className="form-control"
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
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />

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
                    value={formData.old_price}
                    onChange={handleChange}
                  />

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
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* IMAGE */}

              <div className="col-md-8">

                <label className="form-label fw-semibold">
                  Product Image
                </label>


                {/* URL */}

                <input
                  type="url"
                  name="image"
                  className="form-control mb-2"
                  placeholder="Enter Image URL"
                  value={
                    typeof formData.image === "string"
                      ? formData.image
                      : ""
                  }
                  onChange={handleChange}
                />


                <div className="text-center text-muted my-2">
                  OR
                </div>


                {/* FILE */}

                <input
                  type="file"
                  name="imageFile"
                  className="form-control"
                  accept="image/*"
                  onChange={handleImageChange}
                />


                <small className="text-muted">
                  Enter image URL or upload image
                  from your computer.
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


              {/* BUTTON */}

              <div className="col-12">

                <hr />

                <div className="d-flex justify-content-end gap-2">

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
                  >

                    <i className="bi bi-check-lg me-2"></i>

                    Update Product

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

export default EditProduct;