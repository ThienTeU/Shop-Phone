import React from "react";
import { Col, Row, Button, Image } from "react-bootstrap";
import ChatWithShop from "../hooks/ChatWithShop";
import AvatarModal from "../hooks/AvatarModal";
import { Link } from "react-router-dom";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import StorefrontIcon from "@mui/icons-material/Storefront";

const ShopProfile = ({ handleOpenAvatarModal, handleCloseAvatarModal, handleOpenChat, handleCloseChat, showAvatarModal, showChat }) => {
  const stats = [
    { label: "Đánh Giá", value: "68,8k" },
    { label: "Tỉ Lệ Phản Hồi", value: "96%" },
    { label: "Tham Gia", value: "8 năm" },
    { label: "Sản Phẩm", value: "866" },
    { label: "Thời Gian Phản Hồi", value: "Trong vài giờ" },
    { label: "Người Theo Dõi", value: "987,8k" },
  ];

  return (
    <Row className="border border-rounded m-2 p-2">
      {/* Shop Avatar Section */}
      <Col
        md={4}
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100%",
        }}
      >
        <div
          className="shop-info text-center bg-white  p-4 d-flex flex-column align-items-center justify-content-center" // Center content in flex column
          style={{
            flex: 1,
            borderRight: "none",
            margin: "0",
          }}
        >
          <Image
            src="/assets/images/avartashop.png"
            roundedCircle
            className="shop-avatar mb-3"
            onClick={handleOpenAvatarModal}
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              cursor: "pointer",
            }}
          />
          <h5 className="fw-bold mb-3">H-Tech Store</h5>
          <p className="shop-status text-success d-flex align-items-center justify-content-center mb-3">
            <span className="status-indicator bg-success rounded-circle me-2" style={{ width: "10px", height: "10px" }}></span>
            Đang hoạt động
          </p>
          <Button variant="primary" size="sm" className="w-100 d-flex align-items-center justify-content-center mb-2" onClick={handleOpenChat} style={{ gap: "5px" }}>
            <ChatBubbleOutlineIcon />
            Chat Ngay
          </Button>
          <Button variant="secondary" size="sm" className="w-100 d-flex align-items-center justify-content-center" as={Link} to={`/productuser`} style={{ gap: "5px" }}>
            <StorefrontIcon />
            Xem Shop
          </Button>
        </div>
        <AvatarModal show={showAvatarModal} handleClose={handleCloseAvatarModal} imageSrc="/assets/images/avartashop.png" />
        <ChatWithShop show={showChat} handleClose={handleCloseChat} />
      </Col>

      {/* Shop Stats Section */}
      <Col md={8} className="shop-stats-col">
        <div
          style={{
            padding: "20px",
            display: "flex",
            height: "100%",
          }}
        >
          <Row className="flex-grow-1">
            {stats.map((stat, index) => (
              <Col
                md={4}
                key={index}
                style={{
                  textAlign: "center",
                  marginBottom: "20px",
                }}
              >
                <h6 style={{ fontSize: "16px", color: "#6c757d" }}>{stat.label}</h6>
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#007bff",
                  }}
                >
                  {stat.value}
                </p>
              </Col>
            ))}
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default ShopProfile;
