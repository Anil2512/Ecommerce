import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import Navbar from "./Navbar";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";


function Header() {

  const navigate = useNavigate();

  const { totalItems } = useCart();

  const {
    wishlistCount
  } = useWishlist();


  const [search, setSearch] = useState("");


  // =========================
  // SEARCH
  // =========================

  const handleSearch = (e) => {

    e.preventDefault();

    const keyword = search.trim();

    if (!keyword) {
      return;
    }

    navigate(
      `/products?search=${encodeURIComponent(keyword)}`
    );

  };


  return (

    <>

      {/* TOP BAR */}

      <div className="bg-dark text-white py-2">

        <div className="container">

          <div className="d-flex justify-content-between align-items-center small">

            <span>
              <i className="bi bi-truck me-2"></i>
              Free Shipping on orders above ₹999
            </span>


            <span className="d-none d-md-block">
              Need Help? +91 8959463595
            </span>

          </div>

        </div>

      </div>


      {/* HEADER */}

      <header className="bg-white border-bottom py-3">

        <div className="container">

          <div className="row align-items-center g-3">


            {/* LOGO */}

            <div className="col-6 col-lg-2">

              <Link
                to="/"
                className="text-decoration-none"
              >

                <h3 className="fw-bold mb-0 text-dark">

                  Shop

                  <span className="text-warning">
                    Mart
                  </span>

                </h3>

              </Link>

            </div>


            {/* SEARCH */}

            <div className="col-12 col-lg-6 order-3 order-lg-2">

              <form onSubmit={handleSearch}>

                <div className="input-group">

                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                  />

                  <button
                    type="submit"
                    className="btn btn-warning px-4"
                  >

                    <i className="bi bi-search"></i>

                  </button>

                </div>

              </form>

            </div>


            {/* ACTIONS */}

            <div className="col-6 col-lg-4 order-2 order-lg-3">

              <div className="d-flex justify-content-end gap-3 gap-lg-4">


                {/* ACCOUNT */}

                <Link
                  to="/login"
                  className="text-dark text-decoration-none text-center"
                >

                  <i className="bi bi-person fs-5 d-block"></i>

                  <small className="d-none d-md-block">
                    Account
                  </small>

                </Link>


                {/* WISHLIST */}

                <Link
                  to="/wishlist"
                  className="text-dark text-decoration-none text-center position-relative"
                >

                  <i className="bi bi-heart fs-5 d-block"></i>

                  <small className="d-none d-md-block">
                    Wishlist
                  </small>


                  {wishlistCount > 0 && (

                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">

                      {wishlistCount}

                    </span>

                  )}

                </Link>


                {/* CART */}

                <Link
                  to="/cart"
                  className="text-dark text-decoration-none text-center position-relative"
                >

                  <i className="bi bi-cart3 fs-5 d-block"></i>

                  <small className="d-none d-md-block">
                    Cart
                  </small>


                  {totalItems > 0 && (

                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">

                      {totalItems}

                    </span>

                  )}

                </Link>


              </div>

            </div>


          </div>

        </div>

      </header>


      {/* NAVBAR */}

      <Navbar />

    </>

  );

}


export default Header;