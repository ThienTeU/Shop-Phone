import React from "react";
import { useEffect, useState } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import "./css/Style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Countdown from "react-countdown";
import useCountdown from "../hooks/useCountdown";
import ShopProfile from "./ShopProfile";
import { toast } from "react-toastify";
import ProductReview from "./ProductReview";
import ContactLink from "./ContactLink";
import {
  FaCartArrowDown,
  FaRegClock,
  FaShoppingCart,
  FaInfoCircle,
  FaHome,
} from "react-icons/fa";
import { IoIosFlash } from "react-icons/io";
export default function ProductDetail({ isLogin }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  //đếm ngược flash sale
  const initialTime = 24 * 60 * 60 * 1000; // 24 tiếng - mili giây
  const date = useCountdown(initialTime);
  //tố cáo sản phẩm
  const [showReportModal, setShowReportModal] = useState(false);
  //Hiện thanh chat để chat với shop
  const [showChat, setShowChat] = useState(false);
  const handleOpenChat = () => setShowChat(true);
  const handleCloseChat = () => setShowChat(false);

  const [showAvatarModal, setShowAvatarModal] = useState(false);
  // show ảnh ava
  const handleOpenAvatarModal = () => {
    setShowAvatarModal(true);
  };
  // đóng ảnh ava
  const handleCloseAvatarModal = () => {
    setShowAvatarModal(false);
  };

  const renderer = ({ hours, minutes, seconds }) => {
    return (
      <span className="countdown-timer">
        <span className="time-block">{hours} giờ</span>
        <span className="time-block">{minutes} phút</span>
        <span className="time-block">{seconds} giây</span>
      </span>
    );
  };
  // Tạo số lượng đã bán được ngẫu nhiên vì chả bán được cái nào
  const generateRandomSoldCount = () =>
    Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

  // lấy sản phẩm theo id
  useEffect(() => {
    fetch(`http://localhost:9999/products/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setProduct(result);

        fetch(`http://localhost:9999/products`)
          .then((res) => res.json())
          .then((allProducts) => {
            const similar = allProducts
              .filter((p) => p.catID == product.catID && p.id !== product.id)
              .map((p) => ({ ...p, soldCount: generateRandomSoldCount() }));
            setSimilarProducts(similar);
          });
      });
    fetch(`http://localhost:9999/categories`)
      .then((res) => res.json())
      .then((result) => setCategories(result));
  }, [id, product.catID, product.id]);

  const [cartCount, setCartCount] = useState(() => {
    const storedCount = localStorage.getItem("cartCount");
    return storedCount ? parseInt(storedCount) : 0;
  });

  const [cart, setCart] = useState(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    return storedCart || [];
  });

  const handleShowCart = () => {
    if (isLogin) {
      navigate("/cart");
    } else {
      navigate("/verifyorder");
    }
  };

  useEffect(() => {
    localStorage.setItem("cartCount", JSON.stringify(cartCount));
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cartCount, cart]);

  const handleAddToCart = (product, navigateToCart = false) => {
    let storedCart = JSON.parse(JSON.stringify(cart));
    let updatedCart = [];
    let updatedCount = cartCount;
    const ProductExist = storedCart.findIndex((item) => item.id === product.id);

    if (ProductExist !== -1) {
      storedCart[ProductExist].quantity =
        (storedCart[ProductExist].quantity || 1) + 1;
      updatedCart = [...storedCart];
    } else {
      product.quantity = 1;
      updatedCart = [...storedCart, product];
      updatedCount++; // Tăng số lượng sản phẩm trong giỏ hàng khi thêm sản phẩm mới
    }
    setCart(updatedCart);
    setCartCount(updatedCount); // Cập nhật số lượng sản phẩm trong giỏ hàng

    toast.success(`Thêm sản phẩm: ${product.name} thành công!`, {
      autoClose: 2000,
      closeButton: false,
      hideProgressBar: true,
      position: "top-right",
    });

    setTimeout(() => {
      if (navigateToCart) {
        if (isLogin) {
          navigate("/cart");
        } else {
          navigate("/verifyorder");
        }
      }
    }, 0);
  };

  return (
    <Container fluid>
      <Row className="product-detail">
        <Row className="mb-4">
          <Col md={4}>
            <Link to="/home" className="btn btn-dark mb-3">
              <FaHome className="me-2" />
              Trang chủ
            </Link>
          </Col>
          <Col md={4} className="text-center">
            <h2>Thông tin chi tiết sản phẩm</h2>
          </Col>
          <Col md={4} className="text-end">
            <div onClick={handleShowCart} className="btn btn-danger ">
              <FaShoppingCart className="me-2" />
              Giỏ Hàng [{cartCount}]
            </div>
          </Col>
        </Row>

        {/* Product Card Section */}
        <Row>
          <Col md={12}>
            <Card>
              <Card.Header className="bg-warning text-center p-3">
                <div className="d-flex justify-content-center align-items-center">
                  <span className="text-danger text-decoration-underline me-2">
                    4.9
                  </span>
                  <div className="d-flex align-items-center me-2">
                    {[...Array(5)].map((_, index) => (
                      <FontAwesomeIcon
                        key={index}
                        icon={faStar}
                        className="text-danger"
                        aria-label="Star Rating"
                      />
                    ))}
                  </div>
                  <span className="text-danger text-decoration-underline mx-2">
                    {generateRandomSoldCount().toLocaleString("vi-VN")} Đánh Giá
                  </span>
                  <span className="text-danger text-decoration-underline mx-2">
                    {generateRandomSoldCount().toLocaleString("vi-VN")} Đã Bán
                  </span>
                  <a
                    href="#!"
                    className="text-danger text-decoration-none mx-2"
                    onClick={() => setShowReportModal(true)}
                  >
                    Tố Cáo Sản Phẩm
                  </a>
                </div>
              </Card.Header>
              <Card.Body className="d-flex">
                {/* Product Image */}
                <Col md={4} className="d-flex justify-content-center">
                  <Card.Img
                    variant="top"
                    src={product?.image}
                    alt={product?.name}
                    className="img-fluid"
                    style={{ maxWidth: "80%" }}
                  />
                </Col>

                {/* Product Info */}
                <Col md={8}>
                  <div
                    style={{
                      padding: "20px",
                      backgroundColor: "#fff",
                      borderRadius: "10px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {/* Flash Sale Countdown */}
                    <Row className="mt-3">
                      <Col md={4} className="fw-bold text-warning">
                        <IoIosFlash
                          style={{
                            fontSize: "1.2rem",
                            marginRight: "5px",
                          }}
                        />{" "}
                        Flash Sale
                      </Col>
                      <Col md={8} className="text-end text-success">
                        <span className="fw-bold">
                          <FaRegClock
                            style={{ fontSize: "1.2rem", marginRight: "5px" }}
                          />
                          Kết thúc trong
                        </span>
                        <Countdown date={date} renderer={renderer} />
                      </Col>
                    </Row>

                    {/* Product Info */}
                    <div className="fw-bold fs-3">{product?.name}</div>
                    <div>
                      <strong>Giá tiền:</strong>{" "}
                      <span className="text-danger fw-bold ms-2">
                        {product?.price?.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }) || "N/A"}
                      </span>
                      <span className="text-muted text-decoration-line-through ms-2 me-3 fw-bold">
                        {product?.price
                          ? (product.price / 0.88).toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })
                          : "N/A"}
                      </span>
                      <small className="bg-warning text-white rounded px-2 fw-bold">
                        -12% GIẢM
                      </small>
                    </div>
                    <div>
                      <strong>Số lượng:</strong> {product?.quantity} sản phẩm có
                      sẵn
                    </div>
                    <div>
                      <strong>Thể loại:</strong>{" "}
                      {categories?.find((c) => c.id === product.catID)?.name ||
                        "N/A"}
                    </div>
                    <div>
                      <strong>Deal Sốc: </strong> Mua để nhận quà
                    </div>
                    <div>
                      <strong>
                        <FaInfoCircle
                          style={{ fontSize: "1rem", marginRight: "5px" }}
                        />
                        Mô tả sản phẩm:
                      </strong>{" "}
                      {product?.descreption}
                    </div>
                    <div>
                      <strong>Ngày ra mắt:</strong> {product?.date}
                    </div>
                    <div>
                      <strong>Trạng thái:</strong> {product?.status}
                    </div>

                    {/* Add to Cart and Buy Now buttons */}
                    <Row className="mt-3">
                      <Col md={6} className="text-end">
                        <Button
                          className="btn btn-primary d-flex align-items-center w-100"
                          onClick={() => handleAddToCart(product)}
                        >
                          <FaCartArrowDown style={{ marginRight: "8px" }} />
                          Thêm vào giỏ hàng
                        </Button>
                      </Col>
                      <Col md={6}>
                        <Button
                          className="btn btn-success ms-3 d-flex align-items-center w-100"
                          onClick={() => handleAddToCart(product, true)}
                        >
                          <FaShoppingCart style={{ marginRight: "8px" }} />
                          Mua Ngay
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Card.Body>
              <ContactLink randomCount={generateRandomSoldCount} />
            </Card>
          </Col>
        </Row>
      </Row>
      <Row className="d-flex align-items-stretch">
        <ShopProfile
          handleOpenAvatarModal={handleOpenAvatarModal}
          handleCloseAvatarModal={handleCloseAvatarModal}
          handleOpenChat={handleOpenChat}
          handleCloseChat={handleCloseChat}
          showAvatarModal={showAvatarModal}
          showChat={showChat}
        />
      </Row>

      <ProductReview product={product} />
      {/* Footer */}
      <Row>
        <Footer />
      </Row>
    </Container>
  );
}
