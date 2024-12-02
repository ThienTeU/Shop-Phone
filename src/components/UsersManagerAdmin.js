import { Container, Row, Col, Form, Button, Table, Spinner, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [error, setError] = useState(null);

  // Check admin role
  useEffect(() => {
    const loggedInAccount = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInAccount && loggedInAccount.role === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  // Fetch user list
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:9999/accounts")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user data");
        return res.json();
      })
      .then((result) => setUsers(result))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Handle toggle active status
  const handleToggleActive = (userId, currentStatus) => {
    setLoading(true);
    fetch(`http://localhost:9999/accounts/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isActive: !currentStatus }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update status");
        return res.json();
      })
      .then(() => {
        setUsers(users.map((user) => (user.id === userId ? { ...user, isActive: !currentStatus } : user)));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  // Handle role change
  const handleRoleChange = (userId, newRole) => {
    setLoading(true);
    fetch(`http://localhost:9999/accounts/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: newRole }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update role");
        return res.json();
      })
      .then(() => {
        setUsers(users.map((user) => (user.id === userId ? { ...user, role: newRole } : user)));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  // Handle modal confirmation
  const handleShowModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  const handleModalAction = () => {
    modalContent.action();
    setShowModal(false);
  };

  return (
    <Container>
      <Row className="mt-4">
        {/* Sidebar */}
        <Col xs={12} sm={3} md={2} className="categories-container" style={sidebarStyle}>
          <div>
            <Link to="/User/productUser" className="btn btn-outline-primary w-100 mb-2">
              Quản Lý Tài Khoản
            </Link>
            <Link to="/ordermanagement" className="btn btn-outline-primary w-100 mb-2">
              Quản Lý Đơn Hàng
            </Link>
            <Link to="/productadmin" className="btn btn-outline-primary w-100 mb-2">
              Quản Lý Sản Phẩm
            </Link>
          </div>
        </Col>

        {/* User List */}
        <Col xs={12} sm={9} md={10}>
          <h3>Quản Lý Tài Khoản</h3>
          {loading && <Spinner animation="border" />}
          {error && <div className="text-danger mb-3">Error: {error}</div>}
          <Table hover striped bordered>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên người dùng</th>
                <th>Email</th>
                <th>Vai trò</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Form.Select
                      value={user.role}
                      onChange={(e) =>
                        handleShowModal({
                          title: "Xác nhận thay đổi vai trò",
                          message: `Bạn có chắc muốn thay đổi vai trò của ${user.name}?`,
                          action: () => handleRoleChange(user.id, e.target.value),
                        })
                      }
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </Form.Select>
                  </td>
                  <td>
                    <Form.Check
                      type="switch"
                      id={`switch-${user.id}`}
                      checked={user.isActive}
                      onChange={() =>
                        handleShowModal({
                          title: "Xác nhận thay đổi trạng thái",
                          message: `Bạn có chắc muốn thay đổi trạng thái của ${user.name}?`,
                          action: () => handleToggleActive(user.id, user.isActive),
                        })
                      }
                      label={user.isActive ? "Hoạt động" : "Vô hiệu"}
                    />
                  </td>
                  <td>
                    <Button
                      variant={user.isActive ? "danger" : "success"}
                      onClick={() =>
                        handleShowModal({
                          title: user.isActive ? "Vô hiệu hóa tài khoản" : "Kích hoạt tài khoản",
                          message: `Bạn có chắc muốn ${user.isActive ? "vô hiệu hóa" : "kích hoạt"} tài khoản của ${user.name}?`,
                          action: () => handleToggleActive(user.id, user.isActive),
                        })
                      }
                    >
                      {user.isActive ? "Vô hiệu hóa" : "Kích hoạt"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalContent.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalContent.message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleModalAction}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

const sidebarStyle = {
  backgroundColor: "#f8f9fa",
  padding: "15px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  marginBottom: "20px",
};
