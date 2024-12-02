import React, { useState, useEffect } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigation = () => {
  // Inline styles
  const styles = {
    navbar: {
      backgroundColor: "rgb(13, 110, 253)", // Dark background
      padding: "10px 20px",
      transition: "all 0.3s ease-in-out",
    },
    stickyNavbar: {
      backgroundColor: "rgb(13, 110, 253)", // Dark background
      padding: "10px 20px",
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      zIndex: 1000,
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)", // Optional shadow for sticky effect
      transition: "all 0.3s ease-in-out",
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

  // Thanh navigation sẽ đi theo header khi scroll
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* Click vào chữ giới thiệu */
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      window.scrollTo({
        top: aboutSection.offsetTop,
        behavior: "smooth",
      });
    }
  };
  /* Click vào chữ Liên hệ */
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      <Navbar style={isSticky ? styles.stickyNavbar : styles.navbar} id="navbar">
        <Container style={styles.container}>
          <Navbar.Brand style={styles.brand}>Trang chủ</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" style={styles.toggle} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                as={Link}
                to="/productuser"
                style={styles.navLink}
                onMouseEnter={(e) => (e.target.style.color = styles.navLinkHover.color)}
                onMouseLeave={(e) => (e.target.style.color = styles.navLink.color)}
              >
                Sản phẩm
              </Nav.Link>
              <Nav.Link
                as={Link}
                onClick={scrollToAbout}
                to="#about"
                style={styles.navLink}
                onMouseEnter={(e) => (e.target.style.color = styles.navLinkHover.color)}
                onMouseLeave={(e) => (e.target.style.color = styles.navLink.color)}
              >
                Giới thiệu
              </Nav.Link>
              <Nav.Link
                as={Link}
                onClick={scrollToContact}
                to="#contact"
                style={styles.navLink}
                onMouseEnter={(e) => (e.target.style.color = styles.navLinkHover.color)}
                onMouseLeave={(e) => (e.target.style.color = styles.navLink.color)}
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
