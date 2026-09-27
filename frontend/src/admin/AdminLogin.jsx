import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");


 const handleLogin = (e) => {
  e.preventDefault();

  setError("");

  if (
    username.trim() === "admin" &&
    password === "admin123"
  ) {
    localStorage.setItem("adminLoggedIn", "true");

    navigate("/admin");
  } else {
    setError("Invalid username or password");
  }
};
const handleLogout = () => {
  localStorage.removeItem("adminLoggedIn");
  window.location.href = "/admin/login";
};

  return (

    <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">

      <div
        className="card border-0 shadow"
        style={{
          width: "400px",
          maxWidth: "95%"
        }}
      >

        <div className="card-body p-4 p-md-5">

          <div className="text-center mb-4">

            <h2 className="fw-bold">
              Shop<span className="text-warning">Mart</span>
            </h2>

            <p className="text-muted">
              Admin Login
            </p>

          </div>


          {error && (

            <div className="alert alert-danger">

              {error}

            </div>

          )}


          <form onSubmit={handleLogin}>


            {/* USERNAME */}

            <div className="mb-3">

              <label className="form-label fw-semibold">
                Username
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                required
              />

            </div>


            {/* PASSWORD */}

            <div className="mb-4">

              <label className="form-label fw-semibold">
                Password
              </label>

              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

            </div>


            <button
              type="submit"
              className="btn btn-warning w-100 fw-semibold"
            >

              <i className="bi bi-box-arrow-in-right me-2"></i>

              Login

            </button>
          </form>

        </div>

      </div>

    </div>
  );
}
export default AdminLogin;