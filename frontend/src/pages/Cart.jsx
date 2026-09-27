import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {

  const {
    cart,
    removeFromCart,
    updateQuantity,
    totalPrice,
  } = useCart();


  if (cart.length === 0) {

    return (
      <div className="container py-5">

        <div className="text-center py-5">

          <i className="bi bi-cart-x display-1 text-muted"></i>

          <h2 className="fw-bold mt-4">
            Your Cart is Empty
          </h2>

          <p className="text-muted">
            Looks like you haven't added anything to your cart yet.
          </p>

          <Link
            to="/products"
            className="btn btn-warning px-4"
          >
            Continue Shopping
          </Link>

        </div>

      </div>
    );
  }


  return (
    <div className="bg-light min-vh-100 py-5">

      <div className="container">

        <h2 className="fw-bold mb-4">
          Shopping Cart
        </h2>


        <div className="row g-4">

          {/* CART ITEMS */}

          <div className="col-lg-8">

            {cart.map((item) => (

              <div
                className="card border-0 shadow-sm mb-3"
                key={item.id}
              >

                <div className="card-body">

                  <div className="row align-items-center g-3">

                    {/* IMAGE */}

                    <div className="col-4 col-md-2">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded"
                        style={{
                          height: "100px",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />

                    </div>


                    {/* DETAILS */}

                    <div className="col-8 col-md-4">

                      <small className="text-muted">
                        {item.category}
                      </small>

                      <h6 className="fw-bold mt-1">
                        {item.name}
                      </h6>

                      <strong>
                        ₹{item.price.toLocaleString("en-IN")}
                      </strong>

                    </div>


                    {/* QUANTITY */}

                    <div className="col-6 col-md-3">

                      <div className="input-group">

                        <button
                          className="btn btn-outline-secondary"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity - 1
                            )
                          }
                        >
                          −
                        </button>

                        <input
                          type="text"
                          className="form-control text-center"
                          value={item.quantity}
                          readOnly
                        />

                        <button
                          className="btn btn-outline-secondary"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity + 1
                            )
                          }
                        >
                          +
                        </button>

                      </div>

                    </div>


                    {/* TOTAL */}

                    <div className="col-4 col-md-2 text-md-end">

                      <strong>
                        ₹{(
                          item.price * item.quantity
                        ).toLocaleString("en-IN")}
                      </strong>

                    </div>


                    {/* DELETE */}

                    <div className="col-2 col-md-1 text-end">

                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                      >
                        <i className="bi bi-trash"></i>
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>


          {/* SUMMARY */}

          <div className="col-lg-4">

            <div className="card border-0 shadow-sm">

              <div className="card-body p-4">

                <h5 className="fw-bold mb-4">
                  Order Summary
                </h5>


                <div className="d-flex justify-content-between mb-3">

                  <span>
                    Subtotal
                  </span>

                  <strong>
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </strong>

                </div>


                <div className="d-flex justify-content-between mb-3">

                  <span>
                    Shipping
                  </span>

                  <span className="text-success">
                    Free
                  </span>

                </div>


                <hr />


                <div className="d-flex justify-content-between mb-4">

                  <strong>
                    Total
                  </strong>

                  <strong className="fs-4">
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </strong>

                </div>


                <Link
                  to="/checkout"
                  className="btn btn-warning w-100 py-2"
                >
                  Proceed to Checkout
                  <i className="bi bi-arrow-right ms-2"></i>
                </Link>


                <Link
                  to="/products"
                  className="btn btn-outline-dark w-100 mt-2"
                >
                  Continue Shopping
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Cart;