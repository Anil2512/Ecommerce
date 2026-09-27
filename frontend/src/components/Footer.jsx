import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5">

      {/* Newsletter Section */}
      <div className="bg-primary py-4">
        <div className="container">
          <div className="row align-items-center">

            <div className="col-lg-6 mb-3 mb-lg-0">
              <h4 className="fw-bold mb-1">
                Subscribe to Our Newsletter
              </h4>
              <p className="mb-0">
                Get the latest products, offers and updates directly in your inbox.
              </p>
            </div>

            <div className="col-lg-6">
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email address"
                />
                <button className="btn btn-dark px-4">
                  Subscribe
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-5">

        <div className="row g-4">

          {/* Brand */}
          <div className="col-lg-4 col-md-6">

            <h3 className="fw-bold mb-3">
              <i className="bi bi-bag-check-fill text-primary me-2"></i>
              SmartShop
            </h3>

            <p className="text-secondary">
              Your one-stop online shopping destination for quality
              products at the best prices. Shop easily, securely and
              conveniently from anywhere.
            </p>

            {/* Social Icons */}
            <div className="d-flex gap-2 mt-4">

              <a
                href="#"
                className="btn btn-outline-light rounded-circle"
              >
                <i className="bi bi-facebook"></i>
              </a>

              <a
                href="#"
                className="btn btn-outline-light rounded-circle"
              >
                <i className="bi bi-instagram"></i>
              </a>

              <a
                href="#"
                className="btn btn-outline-light rounded-circle"
              >
                <i className="bi bi-twitter-x"></i>
              </a>

              <a
                href="#"
                className="btn btn-outline-light rounded-circle"
              >
                <i className="bi bi-youtube"></i>
              </a>

            </div>

          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">

            <h5 className="fw-bold mb-3">
              Quick Links
            </h5>

            <ul className="list-unstyled">

              <li className="mb-2">
                <Link
                  to="/"
                  className="text-secondary text-decoration-none"
                >
                  Home
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  to="/products"
                  className="text-secondary text-decoration-none"
                >
                  Products
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  to="/wishlist"
                  className="text-secondary text-decoration-none"
                >
                  Wishlist
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  to="/cart"
                  className="text-secondary text-decoration-none"
                >
                  Cart
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  to="/orders"
                  className="text-secondary text-decoration-none"
                >
                  My Orders
                </Link>
              </li>

            </ul>

          </div>

          {/* Customer Service */}
          <div className="col-lg-2 col-md-6">

            <h5 className="fw-bold mb-3">
              Customer Service
            </h5>

            <ul className="list-unstyled">

              <li className="mb-2">
                <a
                  href="#"
                  className="text-secondary text-decoration-none"
                >
                  Contact Us
                </a>
              </li>

              <li className="mb-2">
                <a
                  href="#"
                  className="text-secondary text-decoration-none"
                >
                  FAQ
                </a>
              </li>

              <li className="mb-2">
                <a
                  href="#"
                  className="text-secondary text-decoration-none"
                >
                  Shipping Policy
                </a>
              </li>

              <li className="mb-2">
                <a
                  href="#"
                  className="text-secondary text-decoration-none"
                >
                  Return Policy
                </a>
              </li>

              <li className="mb-2">
                <a
                  href="#"
                  className="text-secondary text-decoration-none"
                >
                  Privacy Policy
                </a>
              </li>

            </ul>

          </div>

          {/* Contact */}
          <div className="col-lg-4 col-md-6">

            <h5 className="fw-bold mb-3">
              Contact Us
            </h5>

            <div className="d-flex mb-3">
              <i className="bi bi-geo-alt-fill text-primary me-3"></i>

              <span className="text-secondary">
                Bhopal, Madhya Pradesh, India
              </span>
            </div>

            <div className="d-flex mb-3">
              <i className="bi bi-telephone-fill text-primary me-3"></i>

              <a
                href="tel:+919999999999"
                className="text-secondary text-decoration-none"
              >
                +91 8959463595
              </a>
            </div>

            <div className="d-flex mb-3">
              <i className="bi bi-envelope-fill text-primary me-3"></i>

              <a
                href="mailto:support@smartshop.com"
                className="text-secondary text-decoration-none"
              >
                support@smartshop.com
              </a>
            </div>

            <div className="d-flex">
              <i className="bi bi-clock-fill text-primary me-3"></i>

              <span className="text-secondary">
                Mon - Sat: 9:00 AM - 6:00 PM
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Footer */}
      <div className="border-top border-secondary">

        <div className="container py-3">

          <div className="row align-items-center">

            <div className="col-md-6 text-center text-md-start">
              <p className="mb-0 text-secondary">
                © {new Date().getFullYear()} SmartShop. All Rights Reserved.
              </p>
            </div>

            <div className="col-md-6 text-center text-md-end mt-2 mt-md-0">

              <span className="text-secondary me-2">
                We Accept
              </span>

              <i className="bi bi-credit-card fs-4 me-2"></i>
              <i className="bi bi-paypal fs-4 me-2"></i>
              <i className="bi bi-wallet2 fs-4"></i>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;