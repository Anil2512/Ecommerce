import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";


function Products() {

  // =========================
  // WISHLIST
  // =========================

  const {
    toggleWishlist,
    isInWishlist
  } = useWishlist();


  // =========================
  // CART
  // =========================

  const {
    addToCart
  } = useCart();


  // =========================
  // SEARCH PARAM
  // =========================

  const [searchParams] = useSearchParams();

  const searchText =
    searchParams.get("search") || "";


  // =========================
  // STATES
  // =========================

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedCategories, setSelectedCategories] = useState([]);

  const [maxPrice, setMaxPrice] = useState(100000);

  const [sort, setSort] = useState("default");


  // =========================
  // GET PRODUCTS
  // =========================

  const getProducts = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/products"
      );

      console.log(
        "Customer Products:",
        response.data
      );

      setProducts(
        response.data.products || []
      );

    } catch (error) {

      console.error(
        "Products Error:",
        error.response?.data ||
        error.message
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    getProducts();

  }, []);


  // =========================
  // CATEGORY FILTER
  // =========================

  const handleCategory = (category) => {

    if (
      selectedCategories.includes(category)
    ) {

      setSelectedCategories(
        selectedCategories.filter(
          (item) => item !== category
        )
      );

    } else {

      setSelectedCategories([
        ...selectedCategories,
        category
      ]);

    }

  };


  // =========================
  // FILTER PRODUCTS
  // =========================

  let filteredProducts = products.filter(
    (product) => {

      // SEARCH
      const searchMatch =
        searchText.trim() === "" ||
        product.name
          ?.toLowerCase()
          .includes(
            searchText.toLowerCase()
          ) ||
        product.category
          ?.toLowerCase()
          .includes(
            searchText.toLowerCase()
          ) ||
        product.description
          ?.toLowerCase()
          .includes(
            searchText.toLowerCase()
          );


      // CATEGORY
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(
          product.category
        );


      // PRICE
      const priceMatch =
        Number(product.price) <= maxPrice;


      return (
        searchMatch &&
        categoryMatch &&
        priceMatch
      );

    }
  );


  // =========================
  // SORT
  // =========================

  if (sort === "low") {

    filteredProducts.sort(
      (a, b) =>
        Number(a.price) -
        Number(b.price)
    );

  }


  if (sort === "high") {

    filteredProducts.sort(
      (a, b) =>
        Number(b.price) -
        Number(a.price)
    );

  }


  // =========================
  // CATEGORIES
  // =========================

  const categories = [
    ...new Set(
      products
        .map(
          (product) =>
            product.category
        )
        .filter(Boolean)
    )
  ];


  // =========================
  // ADD TO CART
  // =========================

  const handleAddToCart = (product) => {

    addToCart(product);

    alert(
      `${product.name} added to cart`
    );

  };


  return (

    <div className="bg-light min-vh-100 py-5">

      <div className="container">


        {/* =========================
            PAGE HEADER
        ========================= */}

        <div className="text-center mb-5">

          <h1 className="fw-bold">
            All Products
          </h1>

          <p className="text-muted">
            Discover our latest products
            and best deals
          </p>


          {/* SEARCH RESULT */}

          {searchText && (

            <p className="text-warning fw-semibold">

              Search results for:
              {" "}
              "{searchText}"

            </p>

          )}

        </div>


        <div className="row g-4">


          {/* =========================
              FILTER SIDEBAR
          ========================= */}

          <div className="col-lg-3">

            <div className="card border-0 shadow-sm">

              <div className="card-body">


                <h5 className="fw-bold mb-4">
                  Filters
                </h5>


                {/* CATEGORY */}

                <h6 className="fw-bold">
                  Category
                </h6>


                {categories.map(
                  (category) => (

                    <div
                      className="form-check mt-3"
                      key={category}
                    >

                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`category-${category}`}
                        checked={selectedCategories.includes(
                          category
                        )}
                        onChange={() =>
                          handleCategory(
                            category
                          )
                        }
                      />

                      <label
                        className="form-check-label"
                        htmlFor={`category-${category}`}
                      >
                        {category}
                      </label>

                    </div>

                  )
                )}


                <hr className="my-4" />


                {/* PRICE */}

                <h6 className="fw-bold">
                  Price Range
                </h6>


                <input
                  type="range"
                  className="form-range mt-3"
                  min="0"
                  max="100000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) =>
                    setMaxPrice(
                      Number(e.target.value)
                    )
                  }
                />


                <div className="d-flex justify-content-between text-muted small">

                  <span>
                    ₹0
                  </span>

                  <span>
                    ₹{maxPrice.toLocaleString("en-IN")}
                  </span>

                </div>


                <hr className="my-4" />


                <button
                  className="btn btn-warning w-100"
                  onClick={() => {

                    setSelectedCategories([]);

                    setMaxPrice(100000);

                  }}
                >
                  Clear Filters
                </button>


              </div>

            </div>

          </div>


          {/* =========================
              PRODUCTS
          ========================= */}

          <div className="col-lg-9">


            {/* SORT */}

            <div className="d-flex justify-content-between align-items-center mb-4">

              <span className="text-muted">

                Showing{" "}

                <strong>
                  {filteredProducts.length}
                </strong>{" "}

                products

              </span>


              <select
                className="form-select w-auto"
                value={sort}
                onChange={(e) =>
                  setSort(e.target.value)
                }
              >

                <option value="default">
                  Sort by
                </option>

                <option value="low">
                  Price: Low to High
                </option>

                <option value="high">
                  Price: High to Low
                </option>

              </select>

            </div>


            {/* =========================
                LOADING
            ========================= */}

            {loading ? (

              <div className="text-center py-5">

                <div
                  className="spinner-border text-warning"
                ></div>

                <p className="text-muted mt-3">
                  Loading products...
                </p>

              </div>

            ) : filteredProducts.length === 0 ? (

              <div className="card border-0 shadow-sm">

                <div className="card-body text-center py-5">

                  <i className="bi bi-box-seam display-4 text-muted"></i>

                  <h5 className="mt-3">
                    No Products Found
                  </h5>

                  <p className="text-muted">
                    Try changing your filters
                    or search.
                  </p>

                </div>

              </div>

            ) : (

              /* =========================
                 PRODUCT GRID
              ========================= */

              <div className="row g-4">

                {filteredProducts.map(
                  (product) => (

                    <div
                      className="col-6 col-md-4"
                      key={product.id}
                    >

                      <div className="card border-0 shadow-sm h-100">


                        {/* IMAGE */}

                        <div className="position-relative">

                          <img
                            src={product.image}
                            alt={product.name}
                            className="card-img-top"
                            style={{
                              height: "220px",
                              objectFit: "cover"
                            }}
                          />


                          {/* SALE */}

                          <span className="badge bg-danger position-absolute top-0 start-0 m-2">

                            Sale

                          </span>


                          {/* WISHLIST */}

                          <button
                            type="button"
                            className="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle"
                            onClick={() =>
                              toggleWishlist(product)
                            }
                          >

                            <i
                              className={
                                isInWishlist(
                                  product.id
                                )
                                  ? "bi bi-heart-fill text-danger"
                                  : "bi bi-heart"
                              }
                            ></i>

                          </button>

                        </div>


                        {/* DETAILS */}

                        <div className="card-body">

                          <small className="text-muted">
                            {product.category}
                          </small>


                          <h6 className="fw-bold mt-2">
                            {product.name}
                          </h6>


                          {/* RATING */}

                          <div className="mb-2">

                            {[...Array(5)].map(
                              (_, index) => (

                                <i
                                  key={index}
                                  className={`bi ${
                                    index <
                                    Number(
                                      product.rating || 0
                                    )
                                      ? "bi-star-fill"
                                      : "bi-star"
                                  } text-warning`}
                                ></i>

                              )
                            )}

                          </div>


                          {/* PRICE */}

                          <div className="d-flex align-items-center gap-2">

                            <strong className="fs-5">

                              ₹
                              {Number(
                                product.price
                              ).toLocaleString("en-IN")}

                            </strong>


                            {product.old_price && (

                              <del className="text-muted small">

                                ₹
                                {Number(
                                  product.old_price
                                ).toLocaleString("en-IN")}

                              </del>

                            )}

                          </div>


                          {/* BUTTONS */}

                          <div className="d-flex gap-2 mt-3">


                            {/* VIEW */}

                            <Link
                              to={`/products/${product.id}`}
                              className="btn btn-outline-dark flex-grow-1"
                            >

                              View

                            </Link>


                            {/* CART */}

                            <button
                              type="button"
                              className="btn btn-warning"
                              onClick={() =>
                                handleAddToCart(
                                  product
                                )
                              }
                            >

                              <i className="bi bi-cart-plus"></i>

                            </button>


                          </div>

                        </div>

                      </div>

                    </div>

                  )
                )}

              </div>

            )}

          </div>

        </div>

      </div>

    </div>

  );

}


export default Products;