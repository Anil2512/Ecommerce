import { NavLink, Outlet } from "react-router-dom";

function AdminLayout() {

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: "bi-speedometer2"
    },
    {
  name: "Products",
  path: "/admin/products",
  icon: "bi-box-seam"
},
    {
      name: "Categories",
      path: "/admin/categories",
      icon: "bi-grid"
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: "bi-cart-check"
    },
    {
      name: "Customers",
      path: "/admin/customers",
      icon: "bi-people"
    },
    {
      name: "Coupons",
      path: "/admin/coupons",
      icon: "bi-ticket-perforated"
    },
    {
      name: "Reviews",
      path: "/admin/reviews",
      icon: "bi-star"
    },
    {
      name: "Reports",
      path: "/admin/reports",
      icon: "bi-bar-chart"
    }
  ];


  return (

    <div className="d-flex min-vh-100 bg-light">

      {/* =========================
          SIDEBAR
      ========================= */}

      <aside
        className="bg-dark text-white p-3 d-flex flex-column"
        style={{
          width: "250px",
          minHeight: "100vh"
        }}
      >

        {/* LOGO */}

        <div className="mb-4 px-2">

          <h3 className="fw-bold mb-0">
            Shop<span className="text-warning">Mart</span>
          </h3>

          <small className="text-secondary">
            Admin Panel
          </small>

        </div>


        {/* MENU */}

        <nav className="nav flex-column gap-1">

          {menuItems.map((item) => (

            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `nav-link rounded px-3 py-2 ${
                  isActive
                    ? "bg-warning text-dark fw-semibold"
                    : "text-white"
                }`
              }
            >

              <i className={`bi ${item.icon} me-3`}></i>

              {item.name}

            </NavLink>

          ))}

        </nav>


        {/* BOTTOM */}

        <div className="mt-auto pt-4">

          <hr className="border-secondary" />

          <NavLink
            to="/"
            className="nav-link text-white px-3 py-2"
          >

            <i className="bi bi-arrow-left me-3"></i>

            Back to Store

          </NavLink>

        </div>

      </aside>


      {/* =========================
          MAIN AREA
      ========================= */}

      <main className="flex-grow-1">

        {/* TOPBAR */}

        <header className="bg-white border-bottom px-4 py-3">

          <div className="d-flex justify-content-between align-items-center">

            <div>

              <h5 className="fw-bold mb-0">
                Admin Dashboard
              </h5>

              <small className="text-muted">
                Manage your store
              </small>

            </div>


            <div className="d-flex align-items-center gap-3">

              <button className="btn btn-light position-relative">

                <i className="bi bi-bell fs-5"></i>

                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  3
                </span>

              </button>


              <div className="d-flex align-items-center gap-2">

                <div
                  className="rounded-circle bg-warning d-flex align-items-center justify-content-center fw-bold"
                  style={{
                    width: "40px",
                    height: "40px"
                  }}
                >
                  A
                </div>

                <div className="d-none d-md-block">

                  <strong className="d-block">
                    Admin
                  </strong>

                  <small className="text-muted">
                    Administrator
                  </small>

                </div>

              </div>

            </div>

          </div>

        </header>


        {/* PAGE CONTENT */}

        <div className="p-4">

          <Outlet />

        </div>

      </main>

    </div>

  );

}

export default AdminLayout;