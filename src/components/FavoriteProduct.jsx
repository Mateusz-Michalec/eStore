import React, { useContext, useState } from "react";
import { Button, Col, Stack } from "react-bootstrap";
import Sizes from "./Sizes";
import DataContext from "../context/dataContext";
import ProductPreview from "./ProductPreview";

export default function FavoriteProduct({ product, component }) {
  const { addToCart, setAlertData } = useContext(DataContext);
  const [selectedSize, setSelectedSize] = useState(
    product.sizes ? "Wybierz rozmiar" : null
  );

  function handleAddToCart() {
    if (
      selectedSize !== "Wybierz rozmiar" &&
      selectedSize !== "Wybierz rozmiar!"
    ) {
      addToCart(product.id, selectedSize, product.price);
      setAlertData({
        show: true,
        text: "Dodano produkt do koszyka!",
        location: "koszyk",
      });
    } else setSelectedSize("Wybierz rozmiar!");
  }

  return (
    <Col xs={12} md={6} xl={4} xxl={3}>
      <article className="product-preview h-100">
        <ProductPreview product={product} component={component} />
        <Stack
          direction="horizontal"
          gap={3}
          className="mt-2 justify-content-center"
        >
          {product.sizes ? (
            <Sizes
              component={component}
              sizes={product.sizes}
              selectedSize={selectedSize}
              handleSizeSelect={(e) => setSelectedSize(e.currentTarget.id)}
            />
          ) : null}
          <Button
            variant={
              product.sizes
                ? selectedSize === "Wybierz rozmiar" ||
                  selectedSize === "Wybierz rozmiar!"
                  ? "secondary"
                  : "dark"
                : "dark"
            }
            className="py-2 rounded-0 w-50"
            onClick={() => handleAddToCart()}
          >
            <i className="bi bi-bag me-2 text-white"></i>
            <strong>Dodaj</strong>
          </Button>
        </Stack>
      </article>
    </Col>
  );
}
