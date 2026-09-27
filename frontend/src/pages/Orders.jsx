import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Orders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


  // GET ORDERS

  const getOrders = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/orders"
      );

      console.log("Orders:", response.data);

      setOrders(response.data.orders || []);

    } catch (error) {

      console.error(
        "Orders Error:",
        error.response?.data || error.message
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    getOrders();

  }, []);


  // LOADING

  if (loading) {

    return (
      <div className="container py-5">

        <div className="text-center">

          <div
            className="spinner-border text-warning"
            role="status"
          ></div>

          <p className="mt-3 text-muted">
            Loading orders...
          </p>

        </div>

      </div>
    );

  }


  // NO ORDERS

  if (orders.length === 0) {

    return (
      <div className="container py-5">

        <div className="text-center py-5">

          <i className="bi bi-box-seam display-1 text-muted"></i>

          <h2 className="fw-bold mt-4">
            No Orders Yet
          </h2>

          <p className="text-muted">
            You haven't placed any orders yet.
          </p>

          <Link
            to="/products"
            className="btn btn-warning px-4"
          >
            Start Shopping
          </Link>

        </div>

      </div>
    );

  }


  return (
    <div className="bg-light min-vh-100 py-5">

      <div className="container">

        {/* HEADER */}

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>

            <h2 className="fw-bold mb-1">
              My Orders
            </h2>

            <p className="text-muted mb-0">
              View your recent orders
            </p>

          </div>


          <Link
            to="/products"
            className="btn btn-outline-dark"
          >
            Continue Shopping
          </Link>

        </div>


        {/* ORDERS */}

        {orders.map((order) => (

          <div
            className="card border-0 shadow-sm mb-4"
            key={order.id}
          >

            <div className="card-body p-4">


              {/* ORDER HEADER */}

              <div className="row align-items-center g-3 mb-3">

                <div className="col-md-3">

                  <small className="text-muted">
                    Order ID
                  </small>

                  <h6 className="fw-bold mb-0">
                    #{order.id}
                  </h6>

                </div>


                <div className="col-md-3">

                  <small className="text-muted">
                    Order Date
                  </small>

                  <h6 className="mb-0">

                    {order.created_at
                      ? new Date(
                          order.created_at
                        ).toLocaleDateString("en-IN")
                      : "-"
                    }

                  </h6>

                </div>


                <div className="col-md-3">

                  <small className="text-muted">
                    Payment
                  </small>

                  <h6 className="mb-0 text-uppercase">
                    {order.payment_method}
                  </h6>

                </div>


                <div className="col-md-3">

                  <span
                    className={`badge ${
                      order.order_status === "Delivered"
                        ? "text-bg-success"
                        : order.order_status === "Cancelled"
                        ? "text-bg-danger"
                        : "text-bg-warning"
                    }`}
                  >
                    {order.order_status}
                  </span>

                </div>

              </div>


              <hr />


              {/* ORDER DETAILS */}

              <div className="row align-items-center">

                <div className="col-md-8">

                  <div className="d-flex align-items-center gap-3">

                    <div
                      className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                      style={{
                        width: "55px",
                        height: "55px"
                      }}
                    >

                      <i className="bi bi-box-seam fs-4 text-warning"></i>

                    </div>


                    <div>

                      <h6 className="fw-semibold mb-1">
                        Order #{order.id}
                      </h6>

                      <small className="text-muted">
                        Customer: {order.customer_name}
                      </small>

                    </div>

                  </div>

                </div>


                <div className="col-md-4 text-md-end mt-3 mt-md-0">

                  <small className="text-muted d-block">
                    Total Amount
                  </small>

                  <strong className="fs-5">

                    ₹{Number(
                      order.total_amount
                    ).toLocaleString("en-IN")}

                  </strong>

                </div>

              </div>


              {/* VIEW BUTTON */}

              <div className="text-end mt-4">

                <Link
                  to={`/orders/${order.id}`}
                  className="btn btn-outline-dark btn-sm"
                >
                  View Order
                  <i className="bi bi-arrow-right ms-2"></i>
                </Link>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Orders;