import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
function Navbar() {
  const { totalItems } = useCart();
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom">

      <div className="container">

        {/* LOGO */}



        {/* MOBILE MENU BUTTON */}

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>


        {/* NAVIGATION */}

        <div
          className="collapse navbar-collapse"
          id="mainNavbar"
        >

          <ul className="navbar-nav mx-auto align-items-lg-center gap-lg-3">

            {/* HOME */}

            <li className="nav-item">

              <Link
                className="nav-link fw-semibold"
                to="/"
              >
                Home
              </Link>

            </li>
            {/* PRODUCTS */}
            <li className="nav-item">
              <Link
                className="nav-link fw-semibold"
                to="/products">
                Products
              </Link>
            </li>


            {/* ELECTRONICS */}

           <li className="nav-item">
  <Link
    className="nav-link fw-semibold"
    to="/electronics"
  >
    Electronics
  </Link>
</li>


            {/* FASHION */}

            <li className="nav-item">

              <Link
                className="nav-link fw-semibold"
                to="/products"
              >
                Fashion
              </Link>

            </li>


            {/* HOME & KITCHEN */}

            <li className="nav-item">

              <Link
                className="nav-link fw-semibold"
                to="/products"
              >
                Home & Kitchen
              </Link>

            </li>


            {/* BEAUTY */}

            <li className="nav-item">

              <Link
                className="nav-link fw-semibold"
                to="/products"
              >
                Beauty
              </Link>

            </li>


            {/* OFFERS */}

            <li className="nav-item">

              <Link
                className="nav-link fw-semibold"
                to="/products"
              >
                Offers
              </Link>

            </li>

          </ul>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;