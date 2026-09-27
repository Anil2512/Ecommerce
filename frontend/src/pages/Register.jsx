import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
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

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {

      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }
      );

      console.log("Register Response:", response.data);

      alert(
        response.data.message || "Registration successful!"
      );

      navigate("/login");

    } catch (error) {

      console.error(
        "Register Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="bg-light min-vh-100 d-flex align-items-center py-5">

      <div className="container">

        <div className="row justify-content-center">

          <div className="col-md-7 col-lg-6">

            <div className="card border-0 shadow-sm rounded-4">

              <div className="card-body p-4 p-md-5">

                {/* HEADER */}

                <div className="text-center mb-4">

                  <div
                    className="bg-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: "65px",
                      height: "65px"
                    }}
                  >

                    <i className="bi bi-person-plus fs-2"></i>

                  </div>

                  <h3 className="fw-bold">
                    Create Account
                  </h3>

                  <p className="text-muted">
                    Register to continue shopping
                  </p>

                </div>


                <form onSubmit={handleSubmit}>

                  {/* NAME */}

                  <div className="mb-3">

                    <label className="form-label fw-semibold">
                      Full Name
                    </label>

                    <div className="input-group">

                      <span className="input-group-text bg-white">
                        <i className="bi bi-person"></i>
                      </span>

                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />

                    </div>

                  </div>


                  {/* EMAIL */}

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


                  {/* PHONE */}

                  <div className="mb-3">

                    <label className="form-label fw-semibold">
                      Phone Number
                    </label>

                    <div className="input-group">

                      <span className="input-group-text bg-white">
                        <i className="bi bi-telephone"></i>
                      </span>

                      <input
                        type="tel"
                        name="phone"
                        className="form-control"
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={handleChange}
                      />

                    </div>

                  </div>


                  {/* PASSWORD */}

                  <div className="mb-3">

                    <label className="form-label fw-semibold">
                      Password
                    </label>

                    <div className="input-group">

                      <span className="input-group-text bg-white">
                        <i className="bi bi-lock"></i>
                      </span>

                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Create password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength="6"
                      />

                    </div>

                  </div>


                  {/* CONFIRM PASSWORD */}

                  <div className="mb-4">

                    <label className="form-label fw-semibold">
                      Confirm Password
                    </label>

                    <div className="input-group">

                      <span className="input-group-text bg-white">
                        <i className="bi bi-lock-fill"></i>
                      </span>

                      <input
                        type="password"
                        name="confirmPassword"
                        className="form-control"
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        minLength="6"
                      />

                    </div>

                  </div>


                  {/* BUTTON */}

                  <button
                    type="submit"
                    className="btn btn-warning w-100 py-2 fw-semibold"
                    disabled={loading}
                  >

                    {loading ? (

                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Creating Account...
                      </>

                    ) : (

                      <>
                        <i className="bi bi-person-plus me-2"></i>
                        Create Account
                      </>

                    )}

                  </button>

                </form>


                {/* LOGIN */}

                <div className="text-center mt-4">

                  <span className="text-muted">
                    Already have an account?
                  </span>

                  {" "}

                  <Link
                    to="/login"
                    className="text-warning fw-semibold text-decoration-none"
                  >
                    Login
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

export default Register;