import { Row, Col, Card, Pagination, Button, Nav, Navbar, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { toast } from "react-toastify";

export default function ProductUser({ isLogin }) {
  const navigate = useNavigate();
  const { categoryID } = useParams();
  const [search, setSearch] = useState("");
  const [catID, setCatID] = useState(0);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [cartCount, setCartCount] = useState(() => {
    const storedCount = localStorage.getItem("cartCount");
    return storedCount ? parseInt(storedCount) : 0;
  });

  const [cart, setCart] = useState(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    return storedCart || [];
  });

  //Hàm search sản phẩm
  useEffect(() => {
    fetch("http://localhost:9999/categories")
      .then((res) => res.json())
      .then((result) => setCategories(result));

    fetch(categoryID ? `http://localhost:9999/products?catID=${categoryID}` : "http://localhost:9999/products")
      .then((res) => res.json())
      .then((result) => {
        let searchResult = [];
        if (catID === 0) {
          searchResult = result.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.descreption.toLowerCase().includes(search.toLowerCase()));
        } else {
          // eslint-disable-next-line eqeqeq
          searchResult = result.filter((p) => p.catID == catID && p.name.toLowerCase().includes(search.toLowerCase()));
        }
        setProducts(searchResult);
      });
  }, [catID, search, categoryID]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    localStorage.setItem("cartCount", JSON.stringify(cartCount));
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cartCount, cart]);

  const handleAddToCart = (product) => {
    let storedCart = JSON.parse(JSON.stringify(cart));
    let updatedCart = [];
    let updatedCount = cartCount;
    const ProductExist = storedCart.findIndex((item) => item.id === product.id);

    if (ProductExist !== -1) {
      // Kiểm tra nếu số lượng vượt quá 10
      if ((storedCart[ProductExist].quantity || 1) >= 10) {
        toast.success(`Bạn chỉ có thể mua tối đa 10 sản phẩm cho mặt hàng này!`, {
          autoClose: 2000,
          closeButton: false,
          hideProgressBar: true,
          position: "top-center",
        });
        return;
      }
      storedCart[ProductExist].quantity = (storedCart[ProductExist].quantity || 1) + 1;
      updatedCart = [...storedCart];
    } else {
      product.quantity = 1;
      updatedCart = [...storedCart, product];
      updatedCount++; // Tăng số lượng sản phẩm trong giỏ hàng khi thêm sản phẩm mới
    }

    setCart(updatedCart);
    setCartCount(updatedCount); // Cập nhật số lượng sản phẩm trong giỏ hàng
    toast.success(`Thêm sản phẩm: ${product.name} thành công!`, {
      autoClose: 2000,
      closeButton: false,
      hideProgressBar: true,
      position: "top-right",
    });
  };

  // Hàm Show Cart so sánh với Login
  const handleShowCart = () => navigate(isLogin ? "/cart" : "/verifyorder");
  // Hàm sort
  const [sortOrder, setSortOrder] = useState("default");
  const sortProducts = (products, sortOrder) => {
    if (sortOrder === "default") {
      return products.slice();
    } else if (sortOrder === "desc") {
      return products.slice().sort((a, b) => b.price - a.price);
    } else if (sortOrder === "asc") {
      return products.slice().sort((a, b) => a.price - b.price);
    }
    return products.slice();
  };
  //Hàm sắp xếp giá
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setCurrentPage(1);
  };

  // tính số trang dựa trên số sản phẩm
  const sortedProducts = sortProducts(products, sortOrder);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleCategoryChange = (e) => {
    const categoryId = parseInt(e.target.value);
    setSelectedCategory(categoryId);
    setCatID(categoryId);
  };
  // Phân trang
  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      // Hiển thị trang đầu, cuối, hoặc các trang gần vs currentPage
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pages.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => {
              setCurrentPage(i);
              window.scrollTo({
                top: 0, //Về đầu trang nhưng cách đỉnh 520px để không hiện 1 phần có carousel
                behavior: "smooth",
              });
            }}
          >
            {i}
          </Pagination.Item>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        // Thêm dấu "..."
        pages.push(<Pagination.Ellipsis key={`ellipsis-${i}`} />);
      }
    }
    return pages;
  };

  return (
    <div className="container">
      {/* Hiện sản phẩm và showCart*/}
      <Row className="my-3">
        <Col xs={6} md={5}>
          <Form>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "6px",
              }}
            >
              <Form.Control
                type="text"
                placeholder="Nhập tên sản phẩm bạn muốn tìm kiếm..."
                style={{ border: "1px solid Blue", marginRight: "10px" }}
                onChange={handleSearchChange}
              />
              <span className="Search-icon-user">
                <SearchIcon style={{ color: "white", cursor: "pointer" }} />
              </span>
            </div>
          </Form>
        </Col>
        <Col md={3}></Col>
        <Col className="text-end" xs={6} md={4}>
          <div
            style={{ marginRight: "15px" }}
            onClick={handleShowCart}
            className="btn btn-primary"
            onMouseEnter={(e) => (e.target.style.color = "black")}
            onMouseLeave={(e) => (e.target.style.color = "white")}
          >
            🛒 Giỏ Hàng [ <span style={{ fontFamily: "fantasy" }}>{cartCount}</span> ]
          </div>
        </Col>
      </Row>

      {/* Hiện sản phẩm và cột menu trái */}
      <Row>
        {/* Cột Menu Trái */}
        <Col md={2}>
          <div
            style={{
              backgroundColor: "lightgrey",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <Form>
              <Form.Group controlId="sortOrder">
                <Form.Label style={{ fontWeight: "bold" }}>Sắp xếp theo giá:</Form.Label>
                <Form.Control as="select" value={sortOrder} onChange={handleSortChange}>
                  <option value="default">Không sắp xếp</option>
                  <option value="asc">Giá tăng dần</option>
                  <option value="desc">Giá giảm dần</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </div>
          <div
            style={{
              backgroundColor: "lightgrey",
              padding: "20px",
              borderRadius: "10px",
              marginTop: "10px",
            }}
          >
            <Form>
              <Form.Label style={{ fontWeight: "bold" }}>Lựa chọn theo loại:</Form.Label>
              <Form.Select onChange={handleCategoryChange} value={selectedCategory || 0}>
                <option key={0} value={0}>
                  {" "}
                  Tất cả sản phẩm
                </option>
                {categories?.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Form.Select>
            </Form>
          </div>
        </Col>

        {/* Cột chứa sản phẩm */}
        <Col md={10}>
          <Row>
            {sortedProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage).map((p, index) => (
              <Col key={index} md={3} xs={12} sm={6} style={{ marginBottom: "22px" }}>
                <Card
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <Card.Link
                    href={`/product/detail/${p.id}`}
                    style={{
                      height: "200px",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={p.image}
                      alt={p.descreption}
                      style={{
                        objectFit: "contain",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </Card.Link>
                  <Card.Body style={{ flex: "1 1 auto" }}>
                    <Card.Title className="text-center">
                      <Link
                        to={`/product/detail/${p.id}`}
                        style={{
                          textDecoration: "none",
                          fontWeight: "bold",
                          fontSize: "1.5rem",
                        }}
                        onMouseEnter={(e) => (e.target.style.color = "orange")}
                        onMouseLeave={(e) => (e.target.style.color = "blue")}
                      >
                        {p.name}
                      </Link>
                    </Card.Title>
                    <Card.Text style={{ color: "red", fontWeight: "bold" }}>
                      <span style={{ marginRight: "9px", marginLeft: "2px" }}>
                        {p.price.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                      <span
                        style={{
                          textDecoration: "line-through",
                          color: "gray",
                          marginRight: "3px",
                        }}
                      >
                        &nbsp;
                        {((p.price * 100) / 87).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>{" "}
                      <small
                        style={{
                          color: "red",
                          backgroundColor: "pink",
                          borderRadius: "5px",
                          padding: "2px 4px",
                        }}
                      >
                        -14%
                      </small>
                    </Card.Text>
                    <Card.Text className="text-dark">{p.descreption}</Card.Text>
                  </Card.Body>
                  <Button
                    variant="success"
                    onClick={() => handleAddToCart(p)}
                    onMouseEnter={(e) => (e.target.style.color = "black")}
                    onMouseLeave={(e) => (e.target.style.color = "white")}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                  <Button
                    style={{ margin: "5px" }}
                    variant="warning"
                    as={Link}
                    to={`/product/detail/${p.id}`}
                    onMouseEnter={(e) => (e.target.style.color = "white")}
                    onMouseLeave={(e) => (e.target.style.color = "black")}
                  >
                    Xem chi tiết
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Phân trang */}
      <Row variant="round" className="mt-3">
        <Pagination style={{ justifyContent: "center" }}>{renderPagination()}</Pagination>
      </Row>
    </div>
  );
}
