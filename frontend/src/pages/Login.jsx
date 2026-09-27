import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    setLoading(true);

    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      formData
    );

    console.log("Login Response:", response.data);

    if (response.data.token) {
      localStorage.setItem(
        "token",
        response.data.token
      );
    }

    if (response.data.user) {
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );
    }

    alert("Login successful!");

    navigate("/");

  } catch (error) {

    console.error(
      "Login Error:",
      error.response?.data || error.message
    );

    alert(
      error.response?.data?.message ||
      "Invalid email or password"
    );

  } finally {

    setLoading(false);

  }
};
  return (
    <div className="bg-light min-vh-100 d-flex align-items-center py-5">

      <div className="container">

        <div className="row justify-content-center">

          <div className="col-md-6 col-lg-5">

            <div className="card border-0 shadow-sm rounded-4">

              <div className="card-body p-4 p-md-5">

                {/* Logo / Title */}

                <div className="text-center mb-4">

                  <div
                    className="bg-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: "65px",
                      height: "65px"
                    }}
                  >
                    <i className="bi bi-person fs-2"></i>
                  </div>

                  <h3 className="fw-bold mb-1">
                    Welcome Back
                  </h3>

                  <p className="text-muted mb-0">
                    Login to your account
                  </p>

                </div>


                {/* Login Form */}

                <form onSubmit={handleSubmit}>

                  {/* Email */}

                  <div className="mb-3">

                    <label className="form-label fw-semibold">
                      Email Address
                    </label>

                    <div className="input-group">

                      <span className="input-group-text bg-white">
                        <i className="bi bi-envelope"></i>
                      </span>

                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />

                    </div>

                  </div>


                  {/* Password */}

                  <div className="mb-3">

                    <div className="d-flex justify-content-between">

                      <label className="form-label fw-semibold">
                        Password
                      </label>

                      <Link
                        to="/forgot-password"
                        className="text-decoration-none text-warning"
                      >
                        Forgot Password?
                      </Link>

                    </div>

                    <div className="input-group">

                      <span className="input-group-text bg-white">
                        <i className="bi bi-lock"></i>
                      </span>

                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />

                    </div>

                  </div>


                  {/* Remember */}

                  <div className="form-check mb-4">

                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="remember"
                    />

                    <label
                      className="form-check-label"
                      htmlFor="remember"
                    >
                      Remember me
                    </label>

                  </div>


                  {/* Login Button */}

                  <button
                    type="submit"
                    className="btn btn-warning w-100 py-2 fw-semibold"
                    disabled={loading}
                  >

                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                        ></span>

                        Logging in...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-box-arrow-in-right me-2"></i>
                        Login
                      </>
                    )}

                  </button>

                </form>


                {/* Divider */}

                <div className="d-flex align-items-center my-4">

                  <hr className="flex-grow-1" />

                  <span className="px-3 text-muted small">
                    OR
                  </span>

                  <hr className="flex-grow-1" />

                </div>


                {/* Register */}

                <div className="text-center">

                  <p className="text-muted mb-2">
                    Don't have an account?
                  </p>

                  <Link
                    to="/register"
                    className="btn btn-outline-dark w-100"
                  >
                    Create New Account
                  </Link>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;