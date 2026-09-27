import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";


// import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";

import Electronics from "./pages/Electronics";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Checkout from "./pages/Checkout";
import OrderDetails from "./pages/OrderDetails";
import Wishlist from "./pages/Wishlist";


import AdminLogin from "./admin/AdminLogin";
import AdminProtectedRoute from "./admin/AdminProtectedRoute";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/Dashboard";
import AdminOrders from "./admin/Orders";
import AdminProducts from "./admin/Products";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";

function App() {

  return (
    <BrowserRouter>

      <Routes>
  <Route path="/electronics" element={<Electronics />} />
        {/* ======== CUSTOMER ====*/}

        <Route path="/"element={ <><Header /> <Home /> </>}/>
        
       

        <Route path="/login"element={<Login />} />

        <Route path="/register"element={<Register />} />

        <Route path="/forgot-password"element={<ForgotPassword />}/>

        <Route path="/verify-otp"element={<VerifyOTP />}/>

        <Route path="/reset-password" element={<ResetPassword />}/>

        <Route path="/checkout" element={<Checkout />} />

        <Route path="/orders" element={<Orders />} />

        <Route path="/orders/:id" element={<OrderDetails />} />

        <Route path="/products"element={<><Header /><Products /></>}/>

        <Route path="/products/:id"element={<><Header /><ProductDetails /></>}/>

        <Route path="/cart"element={<><Header /><Cart /></>} />

        <Route path="/wishlist"element={<><Header /><Wishlist /></>}/>

        {/* ===== ADMIN LOGIN======= */}

        <Route path="/admin/login"element={<AdminLogin />} />

        <Route element={<AdminProtectedRoute />}>

        <Route path="/admin"element={<AdminLayout />}>

            {/* DASHBOARD */}

            <Route index element={<AdminDashboard />}/>

          <Route
  path="/admin/products/add"
  element={<AddProduct />}
/>

            {/* ORDERS */}

            <Route path="orders"element={<AdminOrders />}/>

         {/* PRODUCTS */}

            <Route path="products"element={<AdminProducts />}/>

            {/* ADD PRODUCT */}

            <Route path="products/edit/:id"element={<EditProduct />}/>
          
          </Route>

        </Route>
       

       </Routes>
<Footer/>
    </BrowserRouter>

  );

}


export default App;