import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      {/* ================= HERO ================= */}

      <section className="bg-light py-5">

        <div className="container">

          <div className="row align-items-center g-4">

            {/* LEFT CONTENT */}

            <div className="col-lg-6">

              <span className="badge text-bg-warning mb-3 px-3 py-2">
                Big Shopping Sale
              </span>

              <h1 className="display-4 fw-bold">
                Everything You Need,
                <span className="text-warning">
                  {" "}All in One Place
                </span>
              </h1>

              <p className="lead text-muted mt-3">
                Discover amazing products at the best prices.
                Shop electronics, fashion, home products and more.
              </p>

              <div className="d-flex gap-3 mt-4">

                <Link
                  to="/products"
                  className="btn btn-warning btn-lg px-4"
                >
                  Shop Now
                  <i className="bi bi-arrow-right ms-2"></i>
                </Link>

                <Link
                  to="/products"
                  className="btn btn-outline-dark btn-lg px-4"
                >
                  View Products
                </Link>

              </div>

            </div>


            {/* RIGHT IMAGE */}

            <div className="col-lg-6 text-center">

              <img
                src="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=900&q=80"
                alt="Shopping"
                className="img-fluid rounded-4 shadow"
              />

            </div>

          </div>

        </div>

      </section>


      {/* ================= CATEGORIES ================= */}

      <section className="py-5">

        <div className="container">

          <div className="text-center mb-4">

            <h2 className="fw-bold">
              Shop By Category
            </h2>

            <p className="text-muted">
              Explore our popular categories
            </p>

          </div>


          <div className="row g-4">

            <Category
              icon="bi-phone"
              title="Electronics"
            />

            <Category
              icon="bi-bag"
              title="Fashion"
            />

            <Category
              icon="bi-house"
              title="Home & Kitchen"
            />

            <Category
              icon="bi-heart"
              title="Beauty"
            />

            <Category
              icon="bi-watch"
              title="Accessories"
            />

            <Category
              icon="bi-controller"
              title="Gaming"
            />

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section className="bg-light py-5">

        <div className="container">

          <div className="row g-4">

            <Feature
              icon="bi-truck"
              title="Free Shipping"
              text="Free delivery on orders above ₹999"
            />

            <Feature
              icon="bi-shield-check"
              title="Secure Payment"
              text="100% secure payment options"
            />

            <Feature
              icon="bi-arrow-repeat"
              title="Easy Returns"
              text="7 days easy return policy"
            />

            <Feature
              icon="bi-headset"
              title="24/7 Support"
              text="We're always here to help"
            />

          </div>

        </div>

      </section>


      {/* ================= PRODUCTS ================= */}

      <section className="py-5">

        <div className="container">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>

              <h2 className="fw-bold mb-1">
                Featured Products
              </h2>

              <p className="text-muted mb-0">
                Our most popular products
              </p>

            </div>

            <Link
              to="/products"
              className="btn btn-outline-dark"
            >
              View All
              <i className="bi bi-arrow-right ms-2"></i>
            </Link>

          </div>


          <div className="row g-4">

            <Product
              image="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80"
              title="Laptop"
              price="₹59,999"
            />

            <Product
              image="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80"
              title="Smartphone"
              price="₹29,999"
            />

            <Product
              image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
              title="Headphones"
              price="₹3,999"
            />

            <Product
              image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
              title="Smart Watch"
              price="₹4,999"
            />

          </div>

        </div>

      </section>


      {/* ================= OFFER ================= */}

      <section className="py-5">

        <div className="container">

          <div className="bg-dark text-white rounded-4 p-5">

            <div className="row align-items-center">

              <div className="col-lg-8">

                <span className="badge text-bg-warning mb-3">
                  Limited Time Offer
                </span>

                <h2 className="display-6 fw-bold">
                  Get Up To 50% Off
                </h2>

                <p className="text-white-50">
                  Grab the best deals before they're gone.
                </p>

              </div>

              <div className="col-lg-4 text-lg-end">

                <Link
                  to="/products"
                  className="btn btn-warning btn-lg px-4"
                >
                  Shop Deals
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>

    </>
  );
}


/* ================= CATEGORY ================= */

function Category({ icon, title }) {

  return (

    <div className="col-6 col-md-4 col-lg-2">

      <Link
        to="/products"
        className="text-decoration-none text-dark"
      >

        <div className="card border-0 shadow-sm h-100 text-center">

          <div className="card-body py-4">

            <i className={`${icon} fs-1 text-warning`}></i>

            <h6 className="fw-bold mt-3 mb-0">
              {title}
            </h6>

          </div>

        </div>

      </Link>

    </div>

  );
}


/* ================= FEATURE ================= */

function Feature({ icon, title, text }) {

  return (

    <div className="col-12 col-sm-6 col-lg-3">

      <div className="d-flex align-items-start gap-3">

        <i className={`${icon} fs-2 text-warning`}></i>

        <div>

          <h6 className="fw-bold mb-1">
            {title}
          </h6>

          <p className="text-muted small mb-0">
            {text}
          </p>

        </div>

      </div>

    </div>

  );

}


/* ================= PRODUCT ================= */

function Product({ image, title, price }) {

  return (

    <div className="col-6 col-md-4 col-lg-3">

      <div className="card border-0 shadow-sm h-100">

        <div className="position-relative">

          <img
            src={image}
            alt={title}
            className="card-img-top"
          />

          <button
            className="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle"
          >
            <i className="bi bi-heart"></i>
          </button>

        </div>


        <div className="card-body">

          <h6 className="fw-bold">
            {title}
          </h6>

          <div className="mb-2">

            <i className="bi bi-star-fill text-warning"></i>
            <i className="bi bi-star-fill text-warning"></i>
            <i className="bi bi-star-fill text-warning"></i>
            <i className="bi bi-star-fill text-warning"></i>
            <i className="bi bi-star text-warning"></i>

          </div>

          <div className="d-flex justify-content-between align-items-center">

            <strong className="fs-5">
              {price}
            </strong>

            <button className="btn btn-warning btn-sm">
              <i className="bi bi-cart-plus"></i>
            </button>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Home;