import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function OrderDetails() {

  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);


  const getOrder = async () => {

    try {

      const response = await axios.get(
        `http://localhost:5000/api/orders/${id}`
      );

      console.log("Order Details:", response.data);

      setOrder(response.data.order);
      setItems(response.data.items || []);

    } catch (error) {

      console.error(
        "Order Details Error:",
        error.response?.data || error.message
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    getOrder();

  }, [id]);


  // LOADING

  if (loading) {

    return (
      <div className="container py-5 text-center">

        <div
          className="spinner-border text-warning"
          role="status"
        ></div>

        <p className="text-muted mt-3">
          Loading order...
        </p>

      </div>
    );

  }


  // ORDER NOT FOUND

  if (!order) {

    return (
      <div className="container py-5 text-center">

        <i className="bi bi-exclamation-circle display-3 text-danger"></i>

        <h3 className="fw-bold mt-3">
          Order Not Found
        </h3>

        <Link
          to="/orders"
          className="btn btn-dark mt-3"
        >
          Back to Orders
        </Link>

      </div>
    );

  }


  return (
    <div className="bg-light min-vh-100 py-5">

      <div className="container">

        {/* BACK */}

        <Link
          to="/orders"
          className="text-decoration-none text-dark"
        >
          <i className="bi bi-arrow-left me-2"></i>
          Back to Orders
        </Link>


        {/* HEADER */}

        <div className="d-flex justify-content-between align-items-center mt-4 mb-4">

          <div>

            <h2 className="fw-bold mb-1">
              Order #{order.id}
            </h2>

            <p className="text-muted mb-0">
              Placed on{" "}
              {order.created_at
                ? new Date(
                    order.created_at
                  ).toLocaleDateString("en-IN")
                : "-"
              }
            </p>

          </div>


          <span
            className={`badge fs-6 ${
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


        <div className="row g-4">


          {/* LEFT */}

          <div className="col-lg-8">


            {/* PRODUCTS */}

            <div className="card border-0 shadow-sm mb-4">

              <div className="card-body p-4">

                <h5 className="fw-bold mb-4">
                  Order Items
                </h5>


                {items.map((item) => (

                  <div
                    key={item.id}
                    className="d-flex align-items-center border-bottom py-3"
                  >

                    <div
                      className="bg-light rounded d-flex align-items-center justify-content-center"
                      style={{
                        width: "70px",
                        height: "70px"
                      }}
                    >

                      <i className="bi bi-box-seam fs-3 text-warning"></i>

                    </div>


                    <div className="ms-3 flex-grow-1">

                      <h6 className="fw-semibold mb-1">
                        {item.product_name}
                      </h6>

                      <small className="text-muted">
                        ₹{Number(item.price).toLocaleString("en-IN")}
                        {" × "}
                        {item.quantity}
                      </small>

                    </div>


                    <strong>

                      ₹{Number(
                        item.subtotal
                      ).toLocaleString("en-IN")}

                    </strong>

                  </div>

                ))}


                {/* TOTAL */}

                <div className="d-flex justify-content-between mt-4">

                  <span className="fw-semibold">
                    Total
                  </span>

                  <strong className="fs-5">

                    ₹{Number(
                      order.total_amount
                    ).toLocaleString("en-IN")}

                  </strong>

                </div>

              </div>

            </div>


            {/* CUSTOMER */}

            <div className="card border-0 shadow-sm">

              <div className="card-body p-4">

                <h5 className="fw-bold mb-4">
                  Delivery Information
                </h5>


                <div className="row g-3">

                  <div className="col-md-6">

                    <small className="text-muted">
                      Name
                    </small>

                    <p className="fw-semibold mb-0">
                      {order.customer_name}
                    </p>

                  </div>


                  <div className="col-md-6">

                    <small className="text-muted">
                      Email
                    </small>

                    <p className="fw-semibold mb-0">
                      {order.customer_email}
                    </p>

                  </div>


                  <div className="col-md-6">

                    <small className="text-muted">
                      Phone
                    </small>

                    <p className="fw-semibold mb-0">
                      {order.customer_phone || "-"}
                    </p>

                  </div>


                  <div className="col-md-6">

                    <small className="text-muted">
                      Pincode
                    </small>

                    <p className="fw-semibold mb-0">
                      {order.pincode}
                    </p>

                  </div>


                  <div className="col-12">

                    <small className="text-muted">
                      Address
                    </small>

                    <p className="fw-semibold mb-0">

                      {order.address},{" "}
                      {order.city},{" "}
                      {order.state}

                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* RIGHT */}

          <div className="col-lg-4">


            {/* PAYMENT */}

            <div className="card border-0 shadow-sm mb-4">

              <div className="card-body p-4">

                <h5 className="fw-bold mb-4">
                  Payment Information
                </h5>


                <div className="d-flex justify-content-between mb-3">

                  <span className="text-muted">
                    Method
                  </span>

                  <strong className="text-uppercase">
                    {order.payment_method}
                  </strong>

                </div>


                <div className="d-flex justify-content-between">

                  <span className="text-muted">
                    Payment Status
                  </span>

                  <span className="badge text-bg-success">
                    {order.payment_status}
                  </span>

                </div>

              </div>

            </div>


            {/* ORDER STATUS */}

            <div className="card border-0 shadow-sm">

              <div className="card-body p-4">

                <h5 className="fw-bold mb-4">
                  Order Status
                </h5>


                <div className="d-flex gap-3 mb-3">

                  <i className="bi bi-check-circle-fill text-success fs-5"></i>

                  <div>

                    <strong>
                      Order Placed
                    </strong>

                    <small className="d-block text-muted">
                      Your order has been received
                    </small>

                  </div>

                </div>


                <div className="d-flex gap-3 mb-3">

                  <i
                    className={`bi ${
                      order.order_status === "Processing" ||
                      order.order_status === "Shipped" ||
                      order.order_status === "Delivered"
                        ? "bi-check-circle-fill text-success"
                        : "bi-circle text-muted"
                    } fs-5`}
                  ></i>

                  <strong>
                    Processing
                  </strong>

                </div>


                <div className="d-flex gap-3 mb-3">

                  <i
                    className={`bi ${
                      order.order_status === "Shipped" ||
                      order.order_status === "Delivered"
                        ? "bi-check-circle-fill text-success"
                        : "bi-circle text-muted"
                    } fs-5`}
                  ></i>

                  <strong>
                    Shipped
                  </strong>

                </div>


                <div className="d-flex gap-3">

                  <i
                    className={`bi ${
                      order.order_status === "Delivered"
                        ? "bi-check-circle-fill text-success"
                        : "bi-circle text-muted"
                    } fs-5`}
                  ></i>

                  <strong>
                    Delivered
                  </strong>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default OrderDetails;