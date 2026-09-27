import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function ResetPassword() {

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";
  const otp = location.state?.otp || "";

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!email || !otp) {

      alert(
        "OTP verification information is missing."
      );

      navigate("/forgot-password");

      return;

    }


    if (
      formData.password !==
      formData.confirmPassword
    ) {

      alert(
        "Passwords do not match"
      );

      return;

    }


    if (formData.password.length < 6) {

      alert(
        "Password must be at least 6 characters"
      );

      return;

    }


    try {

      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        {
          email,
          otp,
          password: formData.password
        }
      );

      console.log(
        "Reset Password Response:",
        response.data
      );

      alert(
        response.data.message ||
        "Password reset successfully"
      );

      navigate("/login");

    } catch (error) {

      console.error(
        "Reset Password Error:",
        error.response?.data ||
        error.message
      );

      alert(
        error.response?.data?.message ||
        "Password reset failed"
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

                {/* HEADER */}

                <div className="text-center mb-4">

                  <div
                    className="bg-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: "65px",
                      height: "65px"
                    }}
                  >

                    <i className="bi bi-lock fs-2"></i>

                  </div>

                  <h3 className="fw-bold">
                    Reset Password
                  </h3>

                  <p className="text-muted">
                    Create your new password
                  </p>

                </div>


                <form onSubmit={handleSubmit}>

                  {/* PASSWORD */}

                  <div className="mb-3">

                    <label className="form-label fw-semibold">
                      New Password
                    </label>

                    <div className="input-group">

                      <span className="input-group-text bg-white">
                        <i className="bi bi-lock"></i>
                      </span>

                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Enter new password"
                        value={formData.password}
                        onChange={handleChange}
                        minLength="6"
                        required
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
                        placeholder="Confirm new password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        minLength="6"
                        required
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
                        Resetting Password...
                      </>

                    ) : (

                      <>
                        <i className="bi bi-check-circle me-2"></i>
                        Reset Password
                      </>

                    )}

                  </button>

                </form>


                <div className="text-center mt-4">

                  <Link
                    to="/login"
                    className="text-dark text-decoration-none"
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Back to Login
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

export default ResetPassword;