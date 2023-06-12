import React, { useContext, useState } from "react";
import { Button, Col, Stack } from "react-bootstrap";
import Sizes from "./Sizes";
import ProductPreview from "./ProductPreview";
import CartContext from "../../context/CartContext";

export default function FavoriteProduct({ product, component }) {
  const { addToCart } = useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState(
    product.sizes ? "Wybierz rozmiar" : null
  );

  console.log(product);

  function handleAddToCart() {
    if (
      selectedSize !== "Wybierz rozmiar" &&
      selectedSize !== "Wybierz rozmiar!"
    )
      if (product.sizes) addToCart({ ...product, size: selectedSize });
      else addToCart(product);
    else setSelectedSize("Wybierz rozmiar!");
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
