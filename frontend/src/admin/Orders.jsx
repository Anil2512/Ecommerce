import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


  // =========================
  // GET ALL ORDERS
  // =========================

  const getOrders = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/orders"
      );

      console.log("Admin Orders:", response.data);

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


  // =========================
  // UPDATE STATUS
  // =========================

  const updateStatus = async (id, status) => {

    try {

      await axios.put(
        `http://localhost:5000/api/orders/${id}/status`,
        {
          status: status
        }
      );


      // Refresh orders

      getOrders();


    } catch (error) {

      console.error(
        "Status Update Error:",
        error.response?.data || error.message
      );

      alert("Status update failed");

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
          role="status"
        ></div>

        <p className="text-muted mt-3">
          Loading orders...
        </p>

      </div>
    );

  }


  return (

    <div className="container-fluid py-4">

      {/* HEADER */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold mb-1">
            Orders
          </h2>

          <p className="text-muted mb-0">
            Manage customer orders
          </p>

        </div>


        <button
          className="btn btn-dark"
          onClick={getOrders}
        >
          <i className="bi bi-arrow-clockwise me-2"></i>
          Refresh
        </button>

      </div>


      {/* STATS */}

      <div className="row g-3 mb-4">

        <div className="col-md-3">

          <div className="card border-0 shadow-sm">

            <div className="card-body">

              <small className="text-muted">
                Total Orders
              </small>

              <h3 className="fw-bold mb-0">
                {orders.length}
              </h3>

            </div>

          </div>

        </div>


        <div className="col-md-3">

          <div className="card border-0 shadow-sm">

            <div className="card-body">

              <small className="text-muted">
                Pending
              </small>

              <h3 className="fw-bold text-warning mb-0">

                {
                  orders.filter(
                    order =>
                      order.order_status === "Pending"
                  ).length
                }

              </h3>

            </div>

          </div>

        </div>


        <div className="col-md-3">

          <div className="card border-0 shadow-sm">

            <div className="card-body">

              <small className="text-muted">
                Processing
              </small>

              <h3 className="fw-bold text-primary mb-0">

                {
                  orders.filter(
                    order =>
                      order.order_status === "Processing"
                  ).length
                }

              </h3>

            </div>

          </div>

        </div>


        <div className="col-md-3">

          <div className="card border-0 shadow-sm">

            <div className="card-body">

              <small className="text-muted">
                Delivered
              </small>

              <h3 className="fw-bold text-success mb-0">

                {
                  orders.filter(
                    order =>
                      order.order_status === "Delivered"
                  ).length
                }

              </h3>

            </div>

          </div>

        </div>

      </div>


      {/* ORDERS TABLE */}

      <div className="card border-0 shadow-sm">

        <div className="card-body p-0">

          <div className="table-responsive">

            <table className="table table-hover align-middle mb-0">

              <thead className="table-light">

                <tr>

                  <th className="px-4">
                    Order ID
                  </th>

                  <th>
                    Customer
                  </th>

                  <th>
                    Date
                  </th>

                  <th>
                    Payment
                  </th>

                  <th>
                    Amount
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

                {orders.length === 0 ? (

                  <tr>

                    <td
                      colSpan="7"
                      className="text-center py-5 text-muted"
                    >
                      No orders found
                    </td>

                  </tr>

                ) : (

                  orders.map((order) => (

                    <tr key={order.id}>

                      {/* ORDER ID */}

                      <td className="px-4">

                        <strong>
                          #{order.id}
                        </strong>

                      </td>


                      {/* CUSTOMER */}

                      <td>

                        <div>

                          <strong>
                            {order.customer_name}
                          </strong>

                          <small className="d-block text-muted">
                            {order.customer_email}
                          </small>

                        </div>

                      </td>


                      {/* DATE */}

                      <td>

                        {order.created_at
                          ? new Date(
                              order.created_at
                            ).toLocaleDateString("en-IN")
                          : "-"
                        }

                      </td>


                      {/* PAYMENT */}

                      <td>

                        <span className="text-uppercase">
                          {order.payment_method}
                        </span>

                      </td>


                      {/* AMOUNT */}

                      <td>

                        <strong>

                          ₹{Number(
                            order.total_amount
                          ).toLocaleString("en-IN")}

                        </strong>

                      </td>


                      {/* STATUS */}

                      <td>

                        <select
                          className={`form-select form-select-sm ${
                            order.order_status === "Delivered"
                              ? "border-success"
                              : order.order_status === "Cancelled"
                              ? "border-danger"
                              : "border-warning"
                          }`}
                          value={order.order_status}
                          onChange={(e) =>
                            updateStatus(
                              order.id,
                              e.target.value
                            )
                          }
                          style={{
                            width: "140px"
                          }}
                        >

                          <option value="Pending">
                            Pending
                          </option>

                          <option value="Processing">
                            Processing
                          </option>

                          <option value="Shipped">
                            Shipped
                          </option>

                          <option value="Delivered">
                            Delivered
                          </option>

                          <option value="Cancelled">
                            Cancelled
                          </option>

                        </select>

                      </td>


                      {/* ACTION */}

                      <td>

                        <a
                          href={`/orders/${order.id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-sm btn-outline-dark"
                        >
                          <i className="bi bi-eye me-1"></i>
                          View
                        </a>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Orders;