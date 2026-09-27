import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function ForgotPassword() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        {
          email
        }
      );

      console.log("OTP Response:", response.data);

      alert(
        response.data.message ||
        "OTP sent successfully"
      );

      // Email को next page पर भेजना
      navigate("/verify-otp", {
        state: {
          email: email
        }
      });

    } catch (error) {

      console.error(
        "Forgot Password Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
        "Unable to send OTP"
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

                    <i className="bi bi-key fs-2"></i>

                  </div>

                  <h3 className="fw-bold">
                    Forgot Password?
                  </h3>

                  <p className="text-muted">
                    Enter your registered email
                  </p>

                </div>


                <form onSubmit={handleSubmit}>

                  <div className="mb-4">

                    <label className="form-label fw-semibold">
                      Email Address
                    </label>

                    <div className="input-group">

                      <span className="input-group-text bg-white">
                        <i className="bi bi-envelope"></i>
                      </span>

                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) =>
                          setEmail(e.target.value)
                        }
                        required
                      />

                    </div>

                  </div>


                  <button
                    type="submit"
                    className="btn btn-warning w-100 py-2 fw-semibold"
                    disabled={loading}
                  >

                    {loading ? (

                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Sending OTP...
                      </>

                    ) : (

                      <>
                        <i className="bi bi-send me-2"></i>
                        Send OTP
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

export default ForgotPassword;