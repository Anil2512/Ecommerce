import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";

function Checkout() {

  const navigate = useNavigate();

  const {
    cart,
    totalPrice,
    clearCart
  } = useCart();


  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });


  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

  };


 const handleSubmit = async (e) => {

  e.preventDefault();

  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  try {

    const orderData = {
      customer: formData,
      products: cart,
      total: totalPrice,
      paymentMethod: paymentMethod
    };


    const response = await axios.post("http://localhost:5000/api/orders",
      orderData
    );


    console.log("Order Created:", response.data);


    alert(`Order placed successfully! Order ID: ${response.data.order.id}`
    );


    clearCart();


    navigate("/orders");


  } catch (error) {

    console.error(
      "Order Error:",
      error.response?.data || error.message
    );

    alert(
      error.response?.data?.message ||
      "Order failed. Please try again."
    );

  }

};

  if (cart.length === 0) {

    return (
      <div className="container py-5">

        <div className="text-center py-5">

          <i className="bi bi-cart-x display-1 text-muted"></i>

          <h2 className="fw-bold mt-3">
            Your Cart is Empty
          </h2>

          <Link
            to="/products"
            className="btn btn-warning mt-3"
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

        {/* PAGE TITLE */}

        <div className="mb-4">

          <h2 className="fw-bold">
            Checkout
          </h2>

          <p className="text-muted">
            Complete your order details
          </p>

        </div>


        <form onSubmit={handleSubmit}>

          <div className="row g-4">


            {/* LEFT SIDE */}

            <div className="col-lg-8">


              {/* CUSTOMER DETAILS */}

              <div className="card border-0 shadow-sm mb-4">

                <div className="card-body p-4">

                  <h5 className="fw-bold mb-4">
                    <i className="bi bi-person me-2"></i>
                    Customer Information
                  </h5>


                  <div className="row g-3">

                    <div className="col-md-6">

                      <label className="form-label">
                        Full Name
                      </label>

                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />

                    </div>


                    <div className="col-md-6">

                      <label className="form-label">
                        Email
                      </label>

                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />

                    </div>


                    <div className="col-md-6">

                      <label className="form-label">
                        Phone Number
                      </label>

                      <input
                        type="tel"
                        name="phone"
                        className="form-control"
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />

                    </div>

                  </div>

                </div>

              </div>


              {/* SHIPPING ADDRESS */}

              <div className="card border-0 shadow-sm mb-4">

                <div className="card-body p-4">

                  <h5 className="fw-bold mb-4">

                    <i className="bi bi-geo-alt me-2"></i>

                    Delivery Address

                  </h5>


                  <div className="row g-3">


                    <div className="col-12">

                      <label className="form-label">
                        Address
                      </label>

                      <textarea
                        name="address"
                        rows="3"
                        className="form-control"
                        placeholder="House No, Street, Area"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      ></textarea>

                    </div>


                    <div className="col-md-4">

                      <label className="form-label">
                        City
                      </label>

                      <input
                        type="text"
                        name="city"
                        className="form-control"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />

                    </div>


                    <div className="col-md-4">

                      <label className="form-label">
                        State
                      </label>

                      <input
                        type="text"
                        name="state"
                        className="form-control"
                        value={formData.state}
                        onChange={handleChange}
                        required
                      />

                    </div>


                    <div className="col-md-4">

                      <label className="form-label">
                        PIN Code
                      </label>

                      <input
                        type="text"
                        name="pincode"
                        className="form-control"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                      />

                    </div>

                  </div>

                </div>

              </div>


              {/* PAYMENT */}

              <div className="card border-0 shadow-sm">

                <div className="card-body p-4">

                  <h5 className="fw-bold mb-4">

                    <i className="bi bi-credit-card me-2"></i>

                    Payment Method

                  </h5>


                  {/* COD */}

                  <div className="form-check border rounded p-3 mb-3">

                    <input
                      className="form-check-input"
                      type="radio"
                      name="payment"
                      id="cod"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) =>
                        setPaymentMethod(e.target.value)
                      }
                    />

                    <label
                      className="form-check-label fw-semibold"
                      htmlFor="cod"
                    >
                      Cash on Delivery
                    </label>

                  </div>


                  {/* ONLINE */}

                  <div className="form-check border rounded p-3">

                    <input
                      className="form-check-input"
                      type="radio"
                      name="payment"
                      id="online"
                      value="online"
                      checked={paymentMethod === "online"}
                      onChange={(e) =>
                        setPaymentMethod(e.target.value)
                      }
                    />

                    <label
                      className="form-check-label fw-semibold"
                      htmlFor="online"
                    >
                      Online Payment
                    </label>

                  </div>

                </div>

              </div>

            </div>


            {/* RIGHT SIDE */}

            <div className="col-lg-4">

              <div className="card border-0 shadow-sm">

                <div className="card-body p-4">

                  <h5 className="fw-bold mb-4">
                    Order Summary
                  </h5>


                  {/* PRODUCTS */}

                  {cart.map((item) => (

                    <div
                      className="d-flex gap-3 mb-3"
                      key={item.id}
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                        width="60"
                        height="60"
                        className="rounded"
                        style={{
                          objectFit: "cover",
                        }}
                      />

                      <div className="flex-grow-1">

                        <h6 className="mb-1">
                          {item.name}
                        </h6>

                        <small className="text-muted">
                          Qty: {item.quantity}
                        </small>

                      </div>

                      <strong>
                        ₹{(
                          item.price * item.quantity
                        ).toLocaleString("en-IN")}
                      </strong>

                    </div>

                  ))}


                  <hr />


                  <div className="d-flex justify-content-between mb-2">

                    <span>
                      Subtotal
                    </span>

                    <span>
                      ₹{totalPrice.toLocaleString("en-IN")}
                    </span>

                  </div>


                  <div className="d-flex justify-content-between mb-2">

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


                  <button
                    type="submit"
                    className="btn btn-warning w-100 py-3 fw-semibold"
                  >

                    <i className="bi bi-check-circle me-2"></i>

                    Place Order

                  </button>


                  <div className="text-center mt-3">

                    <small className="text-muted">

                      <i className="bi bi-shield-check me-1"></i>

                      Secure & Safe Checkout

                    </small>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </form>

      </div>

    </div>
  );
}

export default Checkout;