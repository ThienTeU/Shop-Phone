import React, { useState } from "react";
import { Nav, Button, Row, Col, Dropdown, Image } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useTheme } from "./ThemeProvider";
import LogoutIcon from "@mui/icons-material/Logout";
import LockIcon from "@mui/icons-material/Lock";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import AvatarModal from "../hooks/AvatarModal";
import "./css/Style.css";

function Header({ isLogin, setIsLogin }) {
  const navigate = useNavigate();
  const { toggleTheme } = useTheme();
  let accountLogged;
  let accountRole;
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  // show ảnh ava
  const handleOpenAvatarModal = () => {
    setShowAvatarModal(true);
  };
  // đóng ảnh ava
  const handleCloseAvatarModal = () => {
    setShowAvatarModal(false);
  };

  if (isLogin) {
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    accountLogged = accounts[0].name;
    accountRole = accounts[0].role;
  }

  const handleLogout = () => {
    if (window.confirm("Bạn muốn đăng xuất tài khoản?")) {
      setIsLogin(false);
      localStorage.removeItem("accounts");
      navigate("/productuser");
    }
  };

  const handleChangeAccount = () => {
    if (window.confirm("Nếu bạn muốn đổi tài khoản, bạn sẽ bị đăng xuất")) {
      setIsLogin(false);
      navigate("/auth/login");
    }
  };
  const hanldeBackToHome = () => {
    navigate("/home");
  };

  return (
    <div>
      <Row className=" px-2">
        <Col>
          <div className="d-flex">
            <Image
              src="/assets/images/avartashop.png"
              alt="H Logo"
              class="img-fluid"
              style={{ width: "75px", height: "75px" }}
              onClick={handleOpenAvatarModal}
            />
            <h4
              onClick={hanldeBackToHome}
              class="m-2 display-5 font-weight-semi-bold"
            >
              -Tech Store
            </h4>
          </div>
          {/* show ảnh */}
          <AvatarModal
            show={showAvatarModal}
            handleClose={handleCloseAvatarModal}
            imageSrc="/assets/images/avartashop.png"
          />
        </Col>
        {/* cột phải */}
        <Col className="ml-auto">
          <Nav className="justify-content-end">
            {isLogin ? (
              <>
                {accountRole === "admin" && (
                  <>
                    <Nav.Item justify-content-center>
                      <Nav.Link href="/productadmin" style={{ color: "white" }}>
                        <Button
                          style={{
                            marginRight: "10px",
                            backgroundColor: "#DA4E22",
                            padding: "10px 20px",
                          }}
                        >
                          Administrator
                        </Button>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="justify-content-center mt-2">
                      <Dropdown drop="center">
                        <Dropdown.Toggle
                          variant="secondary"
                          id="dropdown-basic"
                          style={{
                            backgroundColor: "#DA4E22",
                            color: "white",
                            padding: "10px 20px",
                          }}
                        >
                          Xin Chào: {accountLogged} <AccountCircleIcon />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu-end">
                          <Dropdown.Item href="/view-profile">
                            <AccountCircleIcon />
                            Thông Tin Cá Nhân
                          </Dropdown.Item>
                          <Dropdown.Item as={Link} to={`/change-password`}>
                            <LockIcon /> Đổi mật khẩu
                          </Dropdown.Item>
                          <Dropdown.Item onClick={handleLogout}>
                            <LogoutIcon /> Đăng Xuất
                          </Dropdown.Item>
                          <Dropdown.Item onClick={handleChangeAccount}>
                            <SyncAltIcon /> Chuyển Tài Khoản
                          </Dropdown.Item>
                          <Dropdown.Item onClick={toggleTheme}>
                            {toggleTheme ? (
                              <Brightness4Icon />
                            ) : (
                              <Brightness7Icon />
                            )}{" "}
                            Mode: Sáng|Tối
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Nav.Item>
                  </>
                )}

                {accountRole === "user" && (
                  <>
                    <Nav.Item justify-content-center>
                      <Nav.Link
                        href="/order-tracking"
                        style={{ color: "white" }}
                      >
                        <Button
                          style={{
                            marginRight: "10px",
                            backgroundColor: "#DA4E22",
                            padding: "10px 20px",
                          }}
                        >
                          Theo dõi đơn hàng <ShoppingCartIcon />
                        </Button>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="justify-content-center mt-2">
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="secondary"
                          id="dropdown-basic"
                          style={{
                            backgroundColor: "#DA4E22",
                            color: "white",
                            padding: "10px 20px",
                          }}
                        >
                          Xin Chào: {accountLogged} <AccountCircleIcon />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item href="/view-profile">
                            <AccountCircleIcon />
                            Thông Tin Cá Nhân
                          </Dropdown.Item>
                          <Dropdown.Item as={Link} to={`/change-password`}>
                            <LockIcon /> Đổi mật khẩu
                          </Dropdown.Item>
                          <Dropdown.Item onClick={handleLogout}>
                            <LogoutIcon /> Đăng Xuất
                          </Dropdown.Item>
                          <Dropdown.Item onClick={handleChangeAccount}>
                            <SyncAltIcon /> Chuyển Tài Khoản
                          </Dropdown.Item>
                          <Dropdown.Item onClick={toggleTheme}>
                            {toggleTheme ? (
                              <Brightness4Icon />
                            ) : (
                              <Brightness7Icon />
                            )}{" "}
                            Mode: Sáng|Tối
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Nav.Item>
                  </>
                )}
              </>
            ) : (
              <>
                <Nav.Item>
                  <Nav.Link href="/auth/login" style={{ color: "white" }}>
                    <Button
                      style={{
                        padding: "10px 20px",
                      }}
                    >
                      Đăng Nhập
                    </Button>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/auth/register" style={{ color: "white" }}>
                    <Button
                      style={{
                        padding: "10px 20px",
                      }}
                    >
                      Đăng Ký
                    </Button>
                  </Nav.Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Col>
      </Row>
    </div>
  );
}

export default Header;
