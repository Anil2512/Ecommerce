import React, { useEffect, useState } from "react";
import Header from "../components/Header";

const Electronics = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/products/electronics"
      );

      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);

  // Electronics products
  const electronicsProducts = products.filter(
    (product) =>
      product.category?.toLowerCase() === "electronics"
  );

  return (
    <>
      {/* Header */}
      <Header />
     
<div className="container py-5">

  {/* Page Header */}
  <div className="d-flex justify-content-between align-items-center mb-4">
    <div>
      <h2 className="fw-bold mb-1">Electronics</h2>
      <p className="text-muted mb-0">
        Explore our latest electronics products.
      </p>
    </div>

    <span className="text-muted">
      {electronicsProducts.length} Products
    </span>
  </div>


  {/* Loading */}
  {loading && (
    <div className="text-center py-5">
      <div
        className="spinner-border text-primary"
        role="status"
      ></div>

      <p className="mt-3 mb-0">
        Loading products...
      </p>
    </div>
  )}


  {/* Error */}
  {!loading && error && (
    <div className="alert alert-danger text-center">
      {error}
    </div>
  )}


  {/* No Products */}
  {!loading &&
    !error &&
    electronicsProducts.length === 0 && (
      <div className="text-center py-5">

        <i className="bi bi-box-seam fs-1 text-muted"></i>

        <h4 className="mt-3">
          No Electronics Products Found
        </h4>

        <p className="text-muted">
          There are currently no products available in this category.
        </p>

      </div>
    )}


  {/* Products */}
  {!loading &&
    !error &&
    electronicsProducts.length > 0 && (

      <div className="row g-4">

        {electronicsProducts.map((product) => (

          <div
            className="col-12 col-sm-6 col-md-4 col-lg-3"
            key={product.id}
          >

            <div className="card h-100 border-0 shadow-sm rounded-3 overflow-hidden">

              {/* Product Image */}
              <div
                className="bg-light d-flex align-items-center justify-content-center p-3"
                style={{ height: "240px" }}
              >

                <img
                  src={
                    product.image
                      ? `http://localhost:5000/uploads/${product.image}`
                      : "/placeholder.jpg"
                  }
                  alt={product.name}
                  className="img-fluid"
                  style={{
                    height: "210px",
                    width: "100%",
                    objectFit: "contain",
                  }}
                />

              </div>


              {/* Product Details */}
              <div className="card-body d-flex flex-column">

                {/* Product Name */}
                <h5
                  className="fw-bold mb-2 text-truncate"
                  title={product.name}
                >
                  {product.name}
                </h5>


                {/* Description */}
                <p
                  className="text-muted small mb-2"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    minHeight: "40px",
                  }}
                >
                  {product.description}
                </p>


                {/* Rating */}
                {product.rating && (
                  <div className="mb-2">

                    <span className="badge bg-warning text-dark">
                      <i className="bi bi-star-fill me-1"></i>
                      {product.rating}
                    </span>

                  </div>
                )}


                {/* Price */}
                <div className="mb-3">

                  <span className="fw-bold fs-5">
                    ₹{product.price}
                  </span>

                  {product.oldPrice && (
                    <span className="text-muted text-decoration-line-through ms-2">
                      ₹{product.oldPrice}
                    </span>
                  )}

                </div>


                {/* Buttons */}
                <div className="mt-auto d-flex gap-2">

                  <button className="btn btn-outline-primary flex-grow-1">
                    <i className="bi bi-eye me-1"></i>
                    View
                  </button>

                  <button className="btn btn-primary flex-grow-1">
                    <i className="bi bi-cart-plus me-1"></i>
                    Cart
                  </button>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    )}

</div>


    </>
  );
};

export default Electronics;