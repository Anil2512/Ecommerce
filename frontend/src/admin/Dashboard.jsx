function Dashboard() {

  return (

    <div>

      {/* HEADER */}

      <div className="mb-4">

        <h2 className="fw-bold">
          Dashboard
        </h2>

        <p className="text-muted">
          Welcome back! Here's what's happening with your store.
        </p>

      </div>


      {/* STATS */}

      <div className="row g-4">


        {/* SALES */}

        <div className="col-sm-6 col-xl-3">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-body">

              <div className="d-flex justify-content-between">

                <div>

                  <small className="text-muted">
                    Total Sales
                  </small>

                  <h3 className="fw-bold mt-2">
                    ₹1,24,500
                  </h3>

                  <small className="text-success">
                    <i className="bi bi-arrow-up"></i>
                    12.5% this month
                  </small>

                </div>

                <div
                  className="bg-warning-subtle rounded p-3"
                >
                  <i className="bi bi-currency-rupee fs-4 text-warning"></i>
                </div>

              </div>

            </div>

          </div>

        </div>


        {/* ORDERS */}

        <div className="col-sm-6 col-xl-3">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-body">

              <div className="d-flex justify-content-between">

                <div>

                  <small className="text-muted">
                    Total Orders
                  </small>

                  <h3 className="fw-bold mt-2">
                    1,248
                  </h3>

                  <small className="text-success">
                    <i className="bi bi-arrow-up"></i>
                    8.2% this month
                  </small>

                </div>

                <div className="bg-primary-subtle rounded p-3">

                  <i className="bi bi-cart-check fs-4 text-primary"></i>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* CUSTOMERS */}

        <div className="col-sm-6 col-xl-3">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-body">

              <div className="d-flex justify-content-between">

                <div>

                  <small className="text-muted">
                    Customers
                  </small>

                  <h3 className="fw-bold mt-2">
                    856
                  </h3>

                  <small className="text-success">
                    <i className="bi bi-arrow-up"></i>
                    5.4% this month
                  </small>

                </div>

                <div className="bg-success-subtle rounded p-3">

                  <i className="bi bi-people fs-4 text-success"></i>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* PRODUCTS */}

        <div className="col-sm-6 col-xl-3">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-body">

              <div className="d-flex justify-content-between">

                <div>

                  <small className="text-muted">
                    Products
                  </small>

                  <h3 className="fw-bold mt-2">
                    245
                  </h3>

                  <small className="text-muted">
                    12 low in stock
                  </small>

                </div>

                <div className="bg-danger-subtle rounded p-3">

                  <i className="bi bi-box-seam fs-4 text-danger"></i>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* BOTTOM */}

      <div className="row g-4 mt-2">


        {/* RECENT ORDERS */}

        <div className="col-lg-8">

          <div className="card border-0 shadow-sm">

            <div className="card-body">

              <div className="d-flex justify-content-between align-items-center mb-4">

                <h5 className="fw-bold mb-0">
                  Recent Orders
                </h5>

                <a
                  href="/admin/orders"
                  className="btn btn-sm btn-outline-dark"
                >
                  View All
                </a>

              </div>


              <div className="table-responsive">

                <table className="table align-middle">

                  <thead>

                    <tr>

                      <th>Order</th>
                      <th>Customer</th>
                      <th>Amount</th>
                      <th>Status</th>

                    </tr>

                  </thead>

                  <tbody>

                    <tr>

                      <td>
                        <strong>#1001</strong>
                      </td>

                      <td>
                        Anil
                      </td>

                      <td>
                        ₹3,999
                      </td>

                      <td>
                        <span className="badge text-bg-warning">
                          Pending
                        </span>
                      </td>

                    </tr>


                    <tr>

                      <td>
                        <strong>#1002</strong>
                      </td>

                      <td>
                        Rahul
                      </td>

                      <td>
                        ₹8,499
                      </td>

                      <td>
                        <span className="badge text-bg-primary">
                          Processing
                        </span>
                      </td>

                    </tr>


                    <tr>

                      <td>
                        <strong>#1003</strong>
                      </td>

                      <td>
                        Priya
                      </td>

                      <td>
                        ₹2,499
                      </td>

                      <td>
                        <span className="badge text-bg-success">
                          Delivered
                        </span>
                      </td>

                    </tr>

                  </tbody>

                </table>

              </div>

            </div>

          </div>

        </div>


        {/* QUICK ACTIONS */}

        <div className="col-lg-4">

          <div className="card border-0 shadow-sm">

            <div className="card-body">

              <h5 className="fw-bold mb-4">
                Quick Actions
              </h5>


              <div className="d-grid gap-3">

                <a
                  href="/admin/products"
                  className="btn btn-warning text-start"
                >

                  <i className="bi bi-plus-circle me-2"></i>

                  Add New Product

                </a>


                <a
                  href="/admin/orders"
                  className="btn btn-light border text-start"
                >

                  <i className="bi bi-cart-check me-2"></i>

                  Manage Orders

                </a>


                <a
                  href="/admin/customers"
                  className="btn btn-light border text-start"
                >

                  <i className="bi bi-people me-2"></i>

                  View Customers

                </a>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;