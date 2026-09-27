import { Link } from "react-router-dom";

import {
  useWishlist
} from "../context/WishlistContext";

import { useCart } from "../context/CartContext";


function Wishlist() {

  const {
    wishlist,
    removeFromWishlist
  } = useWishlist();


  const {
    addToCart
  } = useCart();


  if (wishlist.length === 0) {

    return (

      <>

        <div className="container py-5">

          <div className="text-center py-5">

            <i className="bi bi-heart display-1 text-muted"></i>

            <h2 className="fw-bold mt-3">
              Your Wishlist is Empty
            </h2>

            <p className="text-muted">
              Save your favorite products here.
            </p>

            <Link
              to="/products"
              className="btn btn-warning mt-3"
            >
              Continue Shopping
            </Link>

          </div>

        </div>

      </>

    );

  }


  return (

    <div className="bg-light min-vh-100 py-5">

      <div className="container">

        <div className="mb-4">

          <h2 className="fw-bold">
            My Wishlist
          </h2>

          <p className="text-muted">
            {wishlist.length} product(s) saved
          </p>

        </div>


        <div className="row g-4">

          {wishlist.map((product) => (

            <div
              className="col-6 col-md-4 col-lg-3"
              key={product.id}
            >

              <div className="card border-0 shadow-sm h-100">

                <div className="position-relative">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="card-img-top p-3"
                    style={{
                      height: "220px",
                      objectFit: "contain"
                    }}
                  />


                  <button
                    className="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle"
                    onClick={() =>
                      removeFromWishlist(product.id)
                    }
                  >

                    <i className="bi bi-heart-fill text-danger"></i>

                  </button>

                </div>


                <div className="card-body">

                  <h5 className="fw-semibold">
                    {product.name}
                  </h5>


                  <h5 className="text-warning fw-bold">

                    ₹{Number(product.price).toLocaleString("en-IN")}

                  </h5>


                  <div className="d-flex gap-2 mt-3">

                    <button
                      className="btn btn-warning flex-grow-1"
                      onClick={() => {

                        addToCart(product);

                      }}
                    >

                      <i className="bi bi-cart-plus me-1"></i>

                      Add to Cart

                    </button>


                    <Link
                      to={`/products/${product.id}`}
                      className="btn btn-outline-dark"
                    >

                      <i className="bi bi-eye"></i>

                    </Link>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}


export default Wishlist;