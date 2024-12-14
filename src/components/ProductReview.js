import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Button, Badge } from "react-bootstrap";

const ProductReview = ({ product }) => {
  const [likes, setLikes] = useState(0);
  const [visibleReviews, setVisibleReviews] = useState(4);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const loadMoreReviews = () => {
    setVisibleReviews((prev) => prev + 4); // Load 4 more reviews
  };

  const reviewers = [
    { name: "Nguyễn Đức Huy", rating: 5 },
    { name: "Nguyễn Kim Quang", rating: 4 },
    { name: "Tuấn Anh", rating: 5 },
    { name: "Phúc Nguyên Trịnh", rating: 3 },
    { name: "Nguyễn Kiên", rating: 4 },
    { name: "No Name", rating: 5 },
  ];

  return (
    <div
      style={{
        backgroundColor: "#f8f9fa",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h5
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "24px",
          marginBottom: "20px",
        }}
      >
        Đánh giá sản phẩm
      </h5>
      <div>
        {reviewers.slice(0, visibleReviews).map((reviewer, index) => (
          <Row
            key={index}
            style={{
              marginBottom: "20px",
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Col xs={12} style={{ marginBottom: "10px" }}>
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "18px",
                  color: "#007bff",
                }}
              >
                Người đánh giá: {reviewer.name}
              </span>
            </Col>
            <Col xs={12} style={{ marginBottom: "10px" }}>
              <div>
                {[...Array(reviewer.rating)].map((_, starIndex) => (
                  <FontAwesomeIcon key={starIndex} icon={faStar} color="gold" style={{ marginRight: "5px" }} />
                ))}
                {[...Array(5 - reviewer.rating)].map((_, starIndex) => (
                  <FontAwesomeIcon key={starIndex} icon={faStar} color="#e4e5e9" style={{ marginRight: "5px" }} />
                ))}
              </div>
            </Col>
            <Col xs={12}>
              <p style={{ margin: "0", fontSize: "16px" }}>
                <Badge
                  style={{
                    backgroundColor: "#17a2b8",
                    color: "#fff",
                    padding: "5px 10px",
                    fontSize: "14px",
                    borderRadius: "5px",
                  }}
                >
                  {product?.name || "Chưa xác định"}
                </Badge>
              </p>
            </Col>
          </Row>
        ))}
      </div>
      {visibleReviews < reviewers.length && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button
            variant="primary"
            onClick={loadMoreReviews}
            size="lg"
            style={{
              padding: "10px 20px",
              fontSize: "16px",
            }}
          >
            Tải thêm
          </Button>
        </div>
      )}
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <Button
          variant="outline-primary"
          onClick={handleLike}
          size="lg"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px 20px",
            fontSize: "16px",
          }}
        >
          <FontAwesomeIcon icon={faThumbsUp} style={{ marginRight: "10px" }} />
          {`Hữu ích (${likes})`}
        </Button>
      </div>
    </div>
  );
};

export default ProductReview;
