import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import { Link, useParams, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ProductAdmin() {
  const { categoryID } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [catID, setCatID] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [setSelectedCategoryId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    fetch("http://localhost:9999/categories")
      .then((res) => res.json())
      .then((result) => setCategories(result));

    fetch(categoryID ? `http://localhost:9999/products?catID=${categoryID}` : "http://localhost:9999/products")
      .then((res) => res.json())
      .then((result) => {
        let searchResult = [];
        if (catID === 0) {
          searchResult = result.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
        } else {
          searchResult = result.filter((p) => p.catID == catID && p.name.toLowerCase().includes(search.toLowerCase()));
        }
        setProducts(searchResult);
      });
  }, [catID, search, categoryID]);

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
    console.log("Đã chọn Category ID:", categoryId);
    setSelectedCategory(categoryId);
    setCatID(categoryId);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleDelete = (id, name) => {
    const confirmDelete = window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${name}" không?`);
    if (confirmDelete) {
      fetch(`http://localhost:9999/products/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((result) => {
          setProducts(products.filter((item) => item.id !== id)); //xóa sản phẩm
        });
      alert(`Xóa sản phẩm "${name}" thành công!`);
    }
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col
          xs={12}
          sm={3}
          md={2}
          className="categories-container"
          style={{
            backgroundColor: "#f8f9fa",
            padding: "15px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            marginBottom: "20px",
          }}
        >
          <Category data={categories} onCategorySelect={handleCategorySelect} />

          <Button
            variant="success"
            as={Link}
            to={"/productuser"}
            style={{
              display: "block",
              width: "100%",
              marginTop: "10px",
            }}
          >
            Giao Diện Của Khách
          </Button>

          <Button
            variant="warning"
            as={Link}
            to={"/product/ordermanagement"}
            style={{
              display: "block",
              width: "100%",
              marginTop: "10px",
            }}
          >
            Quản lý đơn hàng
          </Button>
        </Col>

        <Col xs={12} sm={9} md={10} className="products-container">
          <Row>
            <Col xs={3}>
              <Form.Select onChange={handleCategoryChange} value={selectedCategory || 0}>
                <option key={0} value={0}>
                  Tất Cả Sản Phẩm
                </option>
                {categories?.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col xs={6}>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Control type="text" placeholder="Nhập tên sản phẩm muốn tìm kiếm..." style={{ border: "2px solid Blue" }} onChange={handleSearchChange} />
                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} style={{ textAlign: "right" }}>
              <Link to={"/product/create"} className="btn btn-primary">
                Tạo sản phẩm mới
              </Link>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table hover striped bordered>
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
                        {/* eslint-disable-next-line eqeqeq*/}
                        {categories.find((c) => c.id == p.catID)?.name || "N/A"}
                      </td>
                      <td>
                        <Button variant="primary" className="me-2">
                          <Link style={{ color: "white", textDecoration: "none" }} to={`/product/${p.id}/edit`}>
                            Sửa
                          </Link>
                        </Button>
                        <Button variant="danger" onClick={() => handleDelete(p.id, p.name)}>
                          Xóa
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

function Category({ data = [] }) {
  return (
    <div>
      {data.map((c) => (
        <div key={c.id}>
          <Link to={`/product/category/${c.id}`}>{c.name}</Link>
        </div>
      ))}
    </div>
  );
}

export { Category, ProductAdmin };
