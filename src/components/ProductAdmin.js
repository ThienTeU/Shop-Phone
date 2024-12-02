import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Modal,
  Pagination,
} from "react-bootstrap";
import { Link, useParams, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa"; // Icons for delete and edit

export default function ProductAdmin() {
  const { categoryID } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [catID, setCatID] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10); // Set the number of products per page
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    fetch("http://localhost:9999/categories")
      .then((res) => res.json())
      .then((result) => setCategories(result));

    fetch(
      categoryID
        ? `http://localhost:9999/products?catID=${categoryID}`
        : "http://localhost:9999/products"
    )
      .then((res) => res.json())
      .then((result) => {
        let searchResult = [];
        if (catID === 0) {
          searchResult = result.filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase())
          );
        } else {
          searchResult = result.filter(
            (p) =>
              p.catID === catID &&
              p.name.toLowerCase().includes(search.toLowerCase())
          );
        }

        setTotalProducts(searchResult.length); // Set the total number of filtered products
        // Calculate which products should be shown on the current page
        const indexOfLastProduct = currentPage * productsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
        setProducts(
          searchResult.slice(indexOfFirstProduct, indexOfLastProduct)
        );
      });
  }, [catID, search, categoryID, currentPage]);

  useEffect(() => {
    const accountsData = localStorage.getItem("accounts");
    if (accountsData) {
      const accounts = JSON.parse(accountsData);
      const loggedInAccount = accounts[0];

      if (loggedInAccount && loggedInAccount.role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
  }, []);

  if (isAdmin === null) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return <Navigate to="/accessdenied" />;
  }

  const handleCategoryChange = (e) => {
    const categoryId = parseInt(e.target.value);
    setSelectedCategory(categoryId);
    setCatID(categoryId);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleDelete = (id, name) => {
    setProductToDelete({ id, name });
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    fetch(`http://localhost:9999/products/${productToDelete.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setProducts(products.filter((item) => item.id !== productToDelete.id)); // Remove product from the list
        setShowDeleteModal(false);
        alert(`Sản phẩm "${productToDelete.name}" đã được xóa thành công!`);
      });
  };

  // Handle pagination change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Create pagination items
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const paginationItems = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationItems.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => handlePageChange(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  return (
    <Container>
      <Row className="mt-4">
        {/* Sidebar */}
        <Col
          xs={12}
          sm={3}
          md={2}
          className="categories-container"
          style={sidebarStyle}
        >
          <Category data={categories} />
          <Button
            variant="success"
            as={Link}
            to="/productuser"
            style={buttonStyle}
          >
            Giao Diện Của Khách
          </Button>
          <Button
            variant="warning"
            as={Link}
            to="/product/ordermanagement"
            style={buttonStyle}
          >
            Quản lý đơn hàng
          </Button>
          <Button
            variant="warning"
            as={Link}
            to="/User/productUser"
            style={buttonStyle}
          >
            Quản lý tài khoản
          </Button>
        </Col>

        {/* Product List */}
        <Col xs={12} sm={9} md={10} className="products-container">
          <Row>
            <Col xs={3}>
              <Form.Select
                onChange={handleCategoryChange}
                value={selectedCategory || 0}
              >
                <option key={0} value={0}>
                  Tất Cả Sản Phẩm
                </option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col xs={6}>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Nhập tên sản phẩm muốn tìm kiếm..."
                    style={{ border: "2px solid Blue" }}
                    onChange={handleSearchChange}
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} style={{ textAlign: "right" }}>
              <Link to="/product/create" className="btn btn-primary">
                Tạo sản phẩm mới
              </Link>
            </Col>
          </Row>

          {/* Product Table */}
          <Row>
            <Col>
              <Table hover striped bordered responsive>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Tên sản phẩm</th>
                    <th>Giá tiền</th>
                    <th>Số lượng</th>
                    <th>Thể loại</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.name}</td>
                      <td>
                        {p.price.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </td>
                      <td>{p.quantity}</td>
                      <td>
                        {categories.find((c) => c.id === p.catID)?.name ||
                          "N/A"}
                      </td>
                      <td>
                        <Button variant="primary" className="me-2">
                          <Link
                            to={`/product/${p.id}/edit`}
                            style={{ color: "white", textDecoration: "none" }}
                          >
                            <FaEdit /> Sửa
                          </Link>
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(p.id, p.name)}
                        >
                          <FaTrashAlt /> Xóa
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>

          {/* Pagination */}
          <Pagination>{paginationItems}</Pagination>
        </Col>
      </Row>

      {/* Modal for Delete Confirmation */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa sản phẩm "{productToDelete?.name}" không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Hủy
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Xóa
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

const buttonStyle = {
  display: "block",
  width: "100%",
  marginTop: "10px",
};

function Category({ data = [] }) {
  return (
    <div>
      {data.map((c) => (
        <div key={c.id} className="mb-2">
          <Link
            to={`/product/category/${c.id}`}
            className="btn btn-outline-primary w-100"
          >
            {c.name}
          </Link>
        </div>
      ))}
    </div>
  );
}

export { Category, ProductAdmin };
