import React, { useEffect, useState } from "react";
import { Carousel, Spinner } from "react-bootstrap";

const CarouselHomePage = () => {
  const [carousels, setCarousel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:9999/carousels")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch carousel data");
        }
        return res.json();
      })
      .then((result) => {
        setCarousel(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" />
        <p>Loading carousel...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-danger my-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <Carousel interval={2200}>
        {carousels?.map((c) => (
          <Carousel.Item key={c.id}>
            <img
              src={c.image}
              alt={c.alt || "Carousel image"}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselHomePage;
