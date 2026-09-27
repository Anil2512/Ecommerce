import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function VerifyOTP() {

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!email) {

      alert("Email not found. Please try again.");

      navigate("/forgot-password");

      return;

    }

    try {

      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        {
          email,
          otp
        }
      );

      console.log("Verify OTP Response:", response.data);

      alert(
        response.data.message ||
        "OTP verified successfully"
      );

      navigate("/reset-password", {
        state: {
          email,
          otp
        }
      });

    } catch (error) {

      console.error(
        "Verify OTP Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
        "Invalid or expired OTP"
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

                    <i className="bi bi-shield-lock fs-2"></i>

                  </div>

                  <h3 className="fw-bold">
                    Verify OTP
                  </h3>

                  <p className="text-muted mb-1">
                    Enter the OTP sent to
                  </p>

                  <strong>
                    {email}
                  </strong>

                </div>


                <form onSubmit={handleSubmit}>

                  <div className="mb-4">

                    <label className="form-label fw-semibold">
                      Enter OTP
                    </label>

                    <input
                      type="text"
                      className="form-control text-center fs-4"
                      placeholder="Enter 6 digit OTP"
                      value={otp}
                      onChange={(e) =>
                        setOtp(
                          e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 6)
                        )
                      }
                      maxLength="6"
                      required
                    />

                  </div>


                  <button
                    type="submit"
                    className="btn btn-warning w-100 py-2 fw-semibold"
                    disabled={loading}
                  >

                    {loading ? (

                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Verifying...
                      </>

                    ) : (

                      <>
                        <i className="bi bi-check-circle me-2"></i>
                        Verify OTP
                      </>

                    )}

                  </button>

                </form>


                <div className="text-center mt-4">

                  <Link
                    to="/forgot-password"
                    className="text-dark text-decoration-none"
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Change Email
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

export default VerifyOTP;