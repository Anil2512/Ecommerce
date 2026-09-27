import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Products() {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");


  // =========================
  // GET PRODUCTS
  // =========================

  const getProducts = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/products"
      );

      console.log("Products:", response.data);

      setProducts(response.data.products || []);

    } catch (error) {

      console.error(
        "Products Error:",
        error.response?.data || error.message
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    getProducts();

  }, []);


  // =========================
  // DELETE PRODUCT
  // =========================

  const deleteProduct = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;


    try {

      await axios.delete(
        `http://localhost:5000/api/products/${id}`
      );

      alert("Product deleted successfully");

      getProducts();

    } catch (error) {

      console.error(
        "Delete Error:",
        error.response?.data || error.message
      );

      alert("Product delete failed");

    }

  };


  // =========================
  // FILTER PRODUCTS
  // =========================

  const filteredProducts = products.filter((product) => {

    const searchMatch =
      product.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      product.category
        ?.toLowerCase()
        .includes(search.toLowerCase());


    const categoryMatch =
      category === "All" ||
      product.category === category;


    return searchMatch && categoryMatch;

  });


  // =========================
  // CATEGORIES
  // =========================

  const categories = [
    "All",
    ...new Set(
      products.map(
        (product) => product.category
      )
    )
  ];


  return (

    <div>


      {/* =====================
          HEADER
      ===================== */}

      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold mb-1">
            Products
          </h2>

          <p className="text-muted mb-0">
            Manage your store products
          </p>

        </div>


        <Link
          to="/admin/products/add"
          className="btn btn-warning fw-semibold"
        >

          <i className="bi bi-plus-lg me-2"></i>

          Add Product

        </Link>

      </div>


      {/* =====================
          FILTER
      ===================== */}

      <div className="card border-0 shadow-sm mb-4">

        <div className="card-body">

          <div className="row g-3">


            {/* SEARCH */}

            <div className="col-md-7">

              <div className="input-group">

                <span className="input-group-text bg-white">

                  <i className="bi bi-search"></i>

                </span>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search product..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />

              </div>

            </div>


            {/* CATEGORY */}

            <div className="col-md-3">

              <select
                className="form-select"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
              >

                {categories.map((item) => (

                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>

                ))}

              </select>

            </div>


            {/* REFRESH */}

            <div className="col-md-2">

              <button
                className="btn btn-dark w-100"
                onClick={getProducts}
              >

                <i className="bi bi-arrow-clockwise me-2"></i>

                Refresh

              </button>

            </div>

          </div>

        </div>

      </div>


      {/* =====================
          PRODUCT TABLE
      ===================== */}

      <div className="card border-0 shadow-sm">

        <div className="card-body p-0">

          {loading ? (

            <div className="text-center py-5">

              <div
                className="spinner-border text-warning"
                role="status"
              ></div>

              <p className="text-muted mt-3">
                Loading products...
              </p>

            </div>

          ) : (

            <div className="table-responsive">

              <table className="table table-hover align-middle mb-0">

                <thead className="table-light">

                  <tr>

                    <th className="px-4">
                      Product
                    </th>

                    <th>
                      Category
                    </th>

                    <th>
                      Price
                    </th>

                    <th>
                      Stock
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Action
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {filteredProducts.length === 0 ? (

                    <tr>

                      <td
                        colSpan="6"
                        className="text-center py-5"
                      >

                        <i className="bi bi-box-seam display-5 text-muted"></i>

                        <p className="text-muted mt-2 mb-0">
                          No products found
                        </p>

                      </td>

                    </tr>

                  ) : (

                    filteredProducts.map(
                      (product) => (

                        <tr key={product.id}>


                          {/* PRODUCT */}

                          <td className="px-4">

                            <div className="d-flex align-items-center">

                              <div
                                className="border rounded bg-light d-flex align-items-center justify-content-center me-3"
                                style={{
                                  width: "60px",
                                  height: "60px"
                                }}
                              >

                                {product.image ? (

                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="img-fluid rounded"
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "contain"
                                    }}
                                  />

                                ) : (

                                  <i className="bi bi-image text-muted"></i>

                                )}

                              </div>


                              <div>

                                <strong className="d-block">

                                  {product.name}

                                </strong>

                                <small className="text-muted">

                                  ID: #{product.id}

                                </small>

                              </div>

                            </div>

                          </td>


                          {/* CATEGORY */}

                          <td>

                            <span className="badge text-bg-light border">

                              {product.category}

                            </span>

                          </td>


                          {/* PRICE */}

                          <td>

                            <strong>

                              ₹{Number(
                                product.price
                              ).toLocaleString("en-IN")}

                            </strong>

                            {product.old_price && (

                              <del className="d-block text-muted small">

                                ₹{Number(
                                  product.old_price
                                ).toLocaleString("en-IN")}

                              </del>

                            )}

                          </td>


                          {/* STOCK */}

                          <td>

                            <span
                              className={
                                product.stock <= 5
                                  ? "text-danger fw-semibold"
                                  : "text-success fw-semibold"
                              }
                            >

                              {product.stock}

                            </span>

                          </td>


                          {/* STATUS */}

                          <td>

                            <span
                              className={`badge ${
                                product.status === "Active"
                                  ? "text-bg-success"
                                  : "text-bg-secondary"
                              }`}
                            >

                              {product.status}

                            </span>

                          </td>


                          {/* ACTION */}

                          <td>

                            <div className="d-flex gap-2">


                              {/* EDIT */}

                              <Link
                                to={`/admin/products/edit/${product.id}`}
                                className="btn btn-sm btn-outline-primary"
                              >

                                <i className="bi bi-pencil"></i>

                              </Link>


                              {/* DELETE */}

                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() =>
                                  deleteProduct(
                                    product.id
                                  )
                                }
                              >

                                <i className="bi bi-trash"></i>

                              </button>

                            </div>

                          </td>


                        </tr>

                      )
                    )

                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>


      {/* TOTAL */}

      <div className="mt-3">

        <small className="text-muted">

          Showing{" "}
          <strong>
            {filteredProducts.length}
          </strong>{" "}
          of{" "}
          <strong>
            {products.length}
          </strong>{" "}
          products

        </small>

      </div>

    </div>

  );

}

export default Products;