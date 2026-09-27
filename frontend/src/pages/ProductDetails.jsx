import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext"; 
function ProductDetails() {
const { addToCart } = useCart();
  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);

  const product = {
    id: id,
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: 3999,
    oldPrice: 4999,
    rating: 4,
    stock: 15,
    description:
      "Experience high-quality sound with premium wireless headphones. Designed for comfortable long-term use with powerful bass and clear audio.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
  };


  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };


  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };


  return (
    <div className="bg-light min-vh-100 py-5">

      <div className="container">

        {/* BREADCRUMB */}

        <nav aria-label="breadcrumb" className="mb-4">

          <ol className="breadcrumb">

            <li className="breadcrumb-item">
              <Link
                to="/"
                className="text-decoration-none"
              >
                Home
              </Link>
            </li>

            <li className="breadcrumb-item">
              <Link
                to="/products"
                className="text-decoration-none"
              >
                Products
              </Link>
            </li>

            <li className="breadcrumb-item active">
              Product Details
            </li>

          </ol>

        </nav>


        {/* PRODUCT DETAILS */}

        <div className="card border-0 shadow-sm">

          <div className="card-body p-4 p-lg-5">

            <div className="row g-5">


              {/* PRODUCT IMAGE */}

              <div className="col-lg-6">

                <div className="border rounded-4 p-3 bg-white text-center">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="img-fluid rounded-3"
                    style={{
                      height: "450px",
                      width: "100%",
                      objectFit: "contain",
                    }}
                  />

                </div>


                {/* SMALL IMAGE */}

                <div className="d-flex gap-3 mt-3">

                  <button className="btn border p-1">

                    <img
                      src={product.image}
                      alt="Product"
                      width="70"
                      height="70"
                      className="rounded"
                      style={{
                        objectFit: "cover",
                      }}
                    />

                  </button>

                  <button className="btn border p-1">

                    <img
                      src={product.image}
                      alt="Product"
                      width="70"
                      height="70"
                      className="rounded"
                      style={{
                        objectFit: "cover",
                      }}
                    />

                  </button>

                </div>

              </div>


              {/* PRODUCT INFORMATION */}

              <div className="col-lg-6">

                <span className="badge text-bg-warning mb-3">
                  {product.category}
                </span>


                <h1 className="fw-bold mb-3">
                  {product.name}
                </h1>


                {/* RATING */}

                <div className="d-flex align-items-center gap-2 mb-3">

                  <div>

                    {[...Array(5)].map((_, index) => (

                      <i
                        key={index}
                        className={`bi ${
                          index < product.rating
                            ? "bi-star-fill"
                            : "bi-star"
                        } text-warning`}
                      ></i>

                    ))}

                  </div>

                  <span className="text-muted">
                    4.5 (120 Reviews)
                  </span>

                </div>


                <hr />


                {/* PRICE */}

                <div className="d-flex align-items-center gap-3 mb-3">

                  <h2 className="fw-bold mb-0">
                    ₹{product.price.toLocaleString("en-IN")}
                  </h2>

                  <del className="text-muted">
                    ₹{product.oldPrice.toLocaleString("en-IN")}
                  </del>

                  <span className="badge text-bg-success">
                    20% OFF
                  </span>

                </div>


                {/* STOCK */}

                <p className="text-success fw-semibold">

                  <i className="bi bi-check-circle me-2"></i>

                  {product.stock} items available

                </p>


                {/* DESCRIPTION */}

                <p className="text-muted lh-lg">
                  {product.description}
                </p>


                {/* QUANTITY */}

                <div className="mt-4">

                  <label className="fw-semibold mb-2">
                    Quantity
                  </label>

                  <div
                    className="input-group"
                    style={{ width: "140px" }}
                  >

                    <button
                      className="btn btn-outline-secondary"
                      onClick={decreaseQuantity}
                    >
                      −
                    </button>

                    <input
                      type="text"
                      className="form-control text-center"
                      value={quantity}
                      readOnly
                    />

                    <button
                      className="btn btn-outline-secondary"
                      onClick={increaseQuantity}
                    >
                      +
                    </button>

                  </div>

                </div>


                {/* ACTION BUTTONS */}

                <div className="d-flex flex-wrap gap-3 mt-4">

                  <button
  className="btn btn-warning btn-lg px-4"
  onClick={() => addToCart(product, quantity)}
>
  <i className="bi bi-cart-plus me-2"></i>

  Add to Cart
</button>


                  <button className="btn btn-dark btn-lg px-4">

                    <i className="bi bi-lightning-fill me-2"></i>

                    Buy Now

                  </button>


                  <button className="btn btn-outline-danger btn-lg">

                    <i className="bi bi-heart"></i>

                  </button>

                </div>


                {/* FEATURES */}

                <div className="row g-3 mt-4">

                  <div className="col-6">

                    <div className="border rounded p-3">

                      <i className="bi bi-truck text-warning fs-4"></i>

                      <small className="d-block mt-2 fw-semibold">
                        Free Delivery
                      </small>

                    </div>

                  </div>


                  <div className="col-6">

                    <div className="border rounded p-3">

                      <i className="bi bi-arrow-repeat text-warning fs-4"></i>

                      <small className="d-block mt-2 fw-semibold">
                        7 Days Return
                      </small>

                    </div>

                  </div>


                  <div className="col-6">

                    <div className="border rounded p-3">

                      <i className="bi bi-shield-check text-warning fs-4"></i>

                      <small className="d-block mt-2 fw-semibold">
                        Secure Payment
                      </small>

                    </div>

                  </div>


                  <div className="col-6">

                    <div className="border rounded p-3">

                      <i className="bi bi-headset text-warning fs-4"></i>

                      <small className="d-block mt-2 fw-semibold">
                        Customer Support
                      </small>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;