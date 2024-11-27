import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigation = () => {
  // Inline styles
  const styles = {
    navbar: {
      backgroundColor: "rgb(13, 110, 253)", // Dark background
      padding: "10px 20px",
    },
    container: {
      maxWidth: "1200px", // Maximum width for the navigation bar
      margin: "0 auto", // Center the container
    },
    brand: {
      color: "white",
      fontSize: "1.5rem",
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    toggle: {
      backgroundColor: "white",
      border: "none",
    },
    navLink: {
      color: "white",
      fontSize: "1rem",
      fontWeight: 500,
      transition: "color 0.3s ease-in-out",
      textDecoration: "none",
    },
    navLinkHover: {
      color: "black",
    },
  };

  return (
    <div>
      <Navbar style={styles.navbar}>
        <Container style={styles.container}>
          <Navbar.Brand style={styles.brand}>Trang chủ</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            style={styles.toggle}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                as={Link}
                to="/productuser"
                style={styles.navLink}
                onMouseEnter={(e) =>
                  (e.target.style.color = styles.navLinkHover.color)
                }
                onMouseLeave={(e) =>
                  (e.target.style.color = styles.navLink.color)
                }
              >
                Sản phẩm
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/about"
                style={styles.navLink}
                onMouseEnter={(e) =>
                  (e.target.style.color = styles.navLinkHover.color)
                }
                onMouseLeave={(e) =>
                  (e.target.style.color = styles.navLink.color)
                }
              >
                Giới thiệu
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/contact"
                style={styles.navLink}
                onMouseEnter={(e) =>
                  (e.target.style.color = styles.navLinkHover.color)
                }
                onMouseLeave={(e) =>
                  (e.target.style.color = styles.navLink.color)
                }
              >
                Liên hệ
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
