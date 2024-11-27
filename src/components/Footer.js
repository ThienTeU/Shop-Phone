import React, { useState, useEffect } from "react";
import { Form, Button, Row } from "react-bootstrap";
import { Fab, Zoom } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
// npm install --save @fortawesome/fontawesome-free

// effect button back-to-top Start
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const BackToTopButton = styled(Fab)`
  position: fixed;
  bottom: 50px;
  right: 30px;
  z-index: 1000;
  color: white;
  animation: ${({ isVisible }) => (isVisible ? fadeIn : fadeOut)} 0.5s;
`;
// End back-to-top

// Footer Start
function Footer() {
  const [email, setEmail] = useState("");
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.confirm("Email của bạn đã chính xác chưa?")) {
      alert("Thank you for subscribing!");
      setEmail("");
    } else {
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <section id="about" style={{ marginTop: "20px" }}>
              <h3>Giới Thiệu</h3>
              <p>
                Chào mừng bạn đến với Website của chúng tôi - nơi mà công nghệ
                đỉnh cao và chất lượng hoàn hảo gặp gỡ.
              </p>
            </section>
          </div>
          <div className="col-md-3">
            <section id="contact" style={{ marginTop: "20px" }}>
              <h3>Liên Hệ</h3>
              <p>
                Địa chỉ: Thôn 2, Thạch Hòa, Thạch Thất, Hà Nội (FPT University)
              </p>
              <p>Điện thoại: 0123 456 789</p>
              <p>Email: userFSA@fpt.edu.vn</p>
            </section>
          </div>
          <div className="col-md-3">
            <Row style={{ marginTop: "20px" }}>
              <h3>Mạng Xã Hội</h3>
              <ul className="social-icons">
                <Row>
                  <li>
                    <a href="https://react-bootstrap.netlify.app/">
                      <i
                        className="fab fa-facebook"
                        style={{
                          display: " flex",
                          gap: "1em",
                        }}
                      >
                        Facebook
                      </i>
                    </a>
                  </li>
                </Row>
                <Row>
                  <li>
                    <a href="https://react-bootstrap.netlify.app/">
                      <i
                        className="fab fa-twitter"
                        style={{
                          display: " flex",
                          gap: "1em",
                        }}
                      >
                        Twitter
                      </i>
                    </a>
                  </li>
                </Row>
                <Row>
                  <li>
                    <a href="https://react-bootstrap.netlify.app/">
                      <i
                        className="fab fa-instagram"
                        style={{
                          display: " flex",
                          gap: "1em",
                        }}
                      >
                        Instagram
                      </i>
                    </a>
                  </li>
                </Row>
                <Row>
                  <li>
                    <a href="https://react-bootstrap.netlify.app/">
                      <i
                        className="fab fa-linkedin"
                        style={{
                          display: " flex",
                          gap: "1em",
                        }}
                      >
                        Linkedin
                      </i>
                    </a>
                  </li>
                </Row>
                <Row>
                  <li>
                    <a href="https://react-bootstrap.netlify.app/">
                      <i
                        className="fab fa-youtube"
                        style={{
                          display: " flex",
                          gap: "1em",
                        }}
                      >
                        YouTube
                      </i>
                    </a>
                  </li>
                </Row>
                <Row>
                  <li>
                    <a href="https://react-bootstrap.netlify.app/">
                      <i
                        className="fab fa-telegram"
                        style={{
                          display: " flex",
                          gap: "1em",
                        }}
                      >
                        Telegram
                      </i>{" "}
                    </a>
                  </li>
                </Row>
              </ul>
            </Row>
          </div>
          <div className="col-md-3" style={{ marginTop: "20px" }}>
            <h3 className="font-weight-bold text-white mb-4">
              Đăng ký nhận tin
            </h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Control
                  type="email"
                  placeholder="Nhập email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-0 "
                />
              </Form.Group>
              <Button type="submit" className="btn-block border-0 ">
                Đăng Ký Ngay
              </Button>
            </Form>
          </div>
        </div>
      </div>

      <div className="copy-right">
        <div className="row">
          <div className="col-md-12 text-center">
            <p>
              &copy; CopyRight 2024. All rights reserved. Design by{" "}
              <a href="/home">Group 4</a>
            </p>
          </div>
        </div>
      </div>

      {/*button back-to-top */}
      <Zoom in={showButton}>
        <BackToTopButton color="success" onClick={scrollToTop}>
          <FontAwesomeIcon icon={faArrowUp} />
        </BackToTopButton>
      </Zoom>
    </footer>
  );
}

export default Footer;
