import React, { useContext, useEffect, useState } from "react";

import { Button, Form, Col, Container, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductPreview from "./ProductPreview";
import DataContext from "../context/dataContext";
import ProductPhoto from "./ProductPhoto";

export default function CartProduct({ product }) {
  function renderQuantityOptions() {
    const elements = [];
    for (let i = 1; i < 21; i++) {
      elements.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return elements;
  }

  const { addToCart, deleteFromCart } = useContext(DataContext);
  const [quantityOptions, setQuantityOptions] = useState(renderQuantityOptions);
  const [quantity, setQuantity] = useState(product.quantity);

  useEffect(() => {
    addToCart(product, product.size, quantity);
  }, [quantity]);

  return (
    <Col lg={6} xxl={4}>
      <article>
        <Row>
          <Col xs={5}>
            <ProductPhoto product={product} component={"Cart"} />
          </Col>
          <Col xs={7}>
            <section className="border shadow-sm p-3 h-100 position-relative">
              <Stack gap={3}>
                <div className="product-preview-title mt-1">
                  <Link to={`/produkty/${product.id}`}>{product.title}</Link>
                </div>

                <span>
                  Rozmiar: <strong className="text-main">{product.size}</strong>
                </span>

                <Form.Select
                  onChange={(e) => setQuantity(e.target.value)}
                  value={quantity}
                  aria-label="Wybór ilości"
                  className=" rounded-0 my-2"
                >
                  {quantityOptions}
                </Form.Select>
                <span>
                  Suma:{" "}
                  <strong className="text-main">
                    {product.price * product.quantity} PLN
                  </strong>
                </span>

                <button
                  className="position-absolute bottom-right"
                  onClick={() => deleteFromCart(product, product?.size)}
                >
                  <i className="bi bi-trash fs-4"></i>
                </button>
              </Stack>
            </section>
          </Col>
        </Row>
      </article>
    </Col>
  );
}
