import React, { useContext, useState } from "react";
import { Button, Col, Form, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import Sizes from "./Sizes";
import DataContext from "../context/dataContext";

export default function ProductPreview({ product, type }) {
  const { toggleFavoriteProduct, addToCart } = useContext(DataContext);
  const [selectedSize, setSelectedSize] = useState("Wybierz rozmiar");

  function handleAddToCart() {
    if (selectedSize !== "Wybierz rozmiar") addToCart(product);
    else setSelectedSize("Wybierz rozmiar!");
  }

  return (
    <Col xs={12} sm={6} md={6} lg={4}>
      <article className="product-preview h-100">
        <section className="border shadow-sm p-4 pb-5 position-relative">
          <Link to={`/produkty/${product.id}`}>
            <img
              className="w-100 product-preview-img img-contain"
              src={product.image}
              alt={product.title}
            />
          </Link>
          {type === "Favorites" ? (
            <button
              className="position-absolute bottom-right"
              onClick={() => toggleFavoriteProduct(product)}
            >
              <i className="bi bi-trash fs-5"></i>
            </button>
          ) : null}
        </section>
        <section>
          <div className="product-preview-title mt-1">
            <Link to={`/produkty/${product.id}`}>{product.title}</Link>
          </div>
          <p className="fs-7 mb-2">{product.price} PLN</p>
          <Stack direction="horizontal" gap={3}>
            <Sizes
              type={type}
              sizes={product.sizes}
              selectedSize={selectedSize}
              handleSizeSelect={(e) => setSelectedSize(e.currentTarget.id)}
            />
            <Button
              variant={
                selectedSize !== "Wybierz rozmiar" &&
                selectedSize !== "Wybierz rozmiar!"
                  ? "dark"
                  : "secondary"
              }
              className="py-2 px-3 rounded-0 w-50"
              onClick={() => handleAddToCart()}
            >
              <i className="bi bi-bag me-2 text-white"></i>
              <strong>Dodaj</strong>
            </Button>
          </Stack>
        </section>
      </article>
    </Col>
  );
}
