import React, { useState } from "react";
import { Button, Col, Stack } from "react-bootstrap";
import Sizes from "../../components/Product/Sizes";
import ProductPreview from "../../components/Product/ProductPreview";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../cart/cartSlice";
import { getSizeQuantity } from "../sizesSlice";

export default function FavoriteProduct({ product, component }) {
  const dispatch = useDispatch();

  const [selectedSize, setSelectedSize] = useState(
    product.sizes ? "Wybierz rozmiar" : null
  );

  const sizeQuantity = useSelector((state) =>
    getSizeQuantity(state, product.id, selectedSize)
  );

  function handleAddToCart() {
    if (
      selectedSize !== "Wybierz rozmiar" &&
      selectedSize !== "Wybierz rozmiar!"
    )
      dispatch(
        addToCart({
          id: product.id,
          size: selectedSize,
          sizeQuantity: sizeQuantity,
        })
      );
    else if (selectedSize === null)
      dispatch(addToCart({ id: product.id, available: product.available }));
    else setSelectedSize("Wybierz rozmiar!");
  }

  return (
    <Col xs={12} md={6} xl={4} xxl={3}>
      <article className="product-preview">
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
