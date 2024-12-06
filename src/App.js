import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/css/Style.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductUser from "./components/ProductUser";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { ThemeProvider } from "./components/ThemeProvider";
import CarouselHomePage from "./components/Carousel";
import ProductAdmin from "./components/ProductAdmin";
import Navigation from "./components/Navigation";
import Register from "./components/Register";
import Login from "./components/Login";
import { Navigate } from "react-router-dom";
import ChangePassword from "./components/ChangePassword";
import ViewProfile from "./components/ViewProfile";
import CreateProduct from "./components/CreateProduct";
import UserManagement from "./components/UsersManagerAdmin";
import AccessDenied from "./components/AccessDenied";
import ProductDetail from "./components/ProductDetail";
import EditProduct from "./components/EditProduct";
import VerifyOrder from "./components/VerifyOrder";
import Cart from "./components/Cart";

function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let accounts = JSON.parse(localStorage.getItem("accounts"));
    if (accounts) {
      setIsLogin(true);
    }
  }, []);

  // Combined fetch for categories and products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([fetch("http://localhost:9999/products"), fetch("http://localhost:9999/categories")]);
        if (!productsRes.ok || !categoriesRes.ok) {
          throw new Error("Failed to fetch data");
        }
        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();
        setProducts(productsData);
        setCategories(categoriesData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const Layout = ({ children }) => (
    <>
      <Header isLogin={isLogin} setIsLogin={setIsLogin} />
      {children}
      <Footer />
    </>
  );

  if (error) {
    return (
      <div className="text-center text-danger my-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div>
        <BrowserRouter>
          <Routes>
            {/* Redirect từ "/" đến "/home" */}
            <Route path="/" element={<Navigate to="/home" />} />

            {/* home */}
            <Route
              path="/home"
              element={
                <Layout>
                  <Navigation />
                  <CarouselHomePage />
                  <ProductUser products={products} isLogin={isLogin} setIsLogin={setIsLogin} />
                </Layout>
              }
            />

            {/* productlist */}
            <Route
              path="/productuser"
              element={
                <Layout>
                  <Navigation />
                  <ProductUser products={products} isLogin={isLogin} setIsLogin={setIsLogin} />
                </Layout>
              }
            />
            {/* Product manager of role Admin */}
            <Route
              path="/productadmin"
              element={
                <>
                  <Header isLogin={isLogin} setIsLogin={setIsLogin} />
                  <ProductAdmin />
                  <Footer />{" "}
                </>
              }
            />
            <Route
              path="/product/create"
              element={
                <>
                  <Header isLogin={isLogin} setIsLogin={setIsLogin} />
                  <CreateProduct categories={categories} />
                </>
              }
            />
            {/* Hàm filter categories trong Admin */}
            <Route
              path="/product/category/:categoryID"
              element={
                <>
                  <Header isLogin={isLogin} setIsLogin={setIsLogin} /> <ProductAdmin /> <Footer />
                </>
              }
            />
            {/* Chỉnh sửa sản phẩm */}
            <Route
              path="/product/edit/:id"
              element={
                <>
                  <Header isLogin={isLogin} setIsLogin={setIsLogin} />
                  <EditProduct categories={categories} />
                </>
              }
            />
            {/* Đăng ký */}
            <Route
              path="/auth/register"
              element={
                <>
                  <Header />
                  <Register />
                </>
              }
            />
            {/* Đăng nhập */}
            <Route path="/auth/login" element={<Login isLogin={isLogin} setIsLogin={setIsLogin} />} />
            {/*Đổi mật khẩu */}
            <Route
              path="/change-password"
              element={
                <>
                  <Header isLogin={isLogin} setIsLogin={setIsLogin} />
                  <ChangePassword />
                </>
              }
            />
            {/* Xem thông tin cá nhân */}
            <Route
              path="/view-profile"
              element={
                <>
                  <Header isLogin={isLogin} setIsLogin={setIsLogin} />
                  <ViewProfile isLogin={isLogin} />
                </>
              }
            />
            {/* Trang quản lý các tài khoản */}
            <Route
              path="/User/productUser"
              element={
                <Layout>
                  <UserManagement />
                </Layout>
              }
            />
            {/* Trang Chặn quyền Error 403 */}
            <Route path="/accessdenied" element={<AccessDenied />} />
            {/* Tạo sản phẩm mới */}
            <Route
              path="/product/create"
              element={
                <>
                  <Header isLogin={isLogin} setIsLogin={setIsLogin} />
                  <CreateProduct categories={categories} />
                </>
              }
            />
            {/* Chỉnh sửa thông tin sản phẩm */}
            <Route
              path="/product/detail/:id"
              element={
                <>
                  <Header isLogin={isLogin} setIsLogin={setIsLogin} />
                  <ProductDetail isLogin={isLogin} setIsLogin={setIsLogin} />
                </>
              }
            />
            {/* Giỏ hàng cho người dùng Logged */}
            <Route
              path="/cart"
              element={
                <>
                  <Header isLogin={isLogin} setIsLogin={setIsLogin} /> <Cart isLogin={isLogin} setIsLogin={setIsLogin} />{" "}
                </>
              }
            />
            {/* Giỏ hàng cho người dùng không Login */}
            <Route
              path="/verifyorder"
              element={
                <>
                  <Header isLogin={isLogin} setIsLogin={setIsLogin} />
                  <VerifyOrder />{" "}
                </>
              }
            />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
