import React from "react";

import { Col } from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaPinterestP,
  FaHeart,
} from "react-icons/fa";
const ContactLink = ({ randomCount }) => {
  return (
    <div>
      <Col className="d-flex justify-content-center align-items-center m-3 p-3">
        <FaHeart
          style={{ fontSize: "2rem", color: "red", marginRight: "10px" }}
        />
        <span style={{ fontSize: "1.5rem", marginRight: "20px" }}>
          Đã thích ({randomCount()})
        </span>
        <div className="social-share-icons">
          <FaFacebookF
            className="iconicon"
            style={{ fontSize: "1.5rem", margin: "0 8px" }}
          />
          <FaTwitter
            className="iconicon"
            style={{ fontSize: "1.5rem", margin: "0 8px" }}
          />
          <FaInstagram
            className="iconicon"
            style={{ fontSize: "1.5rem", margin: "0 8px" }}
          />
          <FaEnvelope
            className="iconicon"
            style={{ fontSize: "1.5rem", margin: "0 8px" }}
          />
          <FaPinterestP
            className="iconicon"
            style={{ fontSize: "1.5rem", margin: "0 8px" }}
          />
        </div>
      </Col>
    </div>
  );
};

export default ContactLink;
