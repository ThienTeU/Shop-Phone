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
import Navigation from "./components/Navigation";
import Register from "./components/Register";
import Login from "./components/Login";
import { Navigate } from "react-router-dom";
import ChangePassword from "./components/ChangePassword";
import ViewProfile from "./components/ViewProfile";

function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state for products & categories
  const [error, setError] = useState(null); // Error state for fetch operations

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
            <Route
              path="/view-profile"
              element={
                <>
                  <Header isLogin={isLogin} setIsLogin={setIsLogin} />
                  <ViewProfile isLogin={isLogin} />
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
