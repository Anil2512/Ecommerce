import { Navigate, Outlet } from "react-router-dom";

function AdminProtectedRoute() {

  const adminLoggedIn =
    localStorage.getItem("adminLoggedIn");


  if (adminLoggedIn !== "true") {

    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );

  }


  return <Outlet />;

}

export default AdminProtectedRoute;