import React, { useContext, useEffect, useState } from "react";

import { Form, Col, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import DataContext from "../context/dataContext";
import ProductPhoto from "./ProductPhoto";

export default function CartProduct({ product }) {
  function getAvailableSizesQuantity() {
    const sizeObj = product.sizes.find((item) => item[product.size]);
    return Object.values(sizeObj)[0];
  }

  function renderQuantityOptions() {
    const available = product.sizes
      ? getAvailableSizesQuantity()
      : product.available;
    const elements = [];
    for (let i = 1; i < 21; i++) {
      elements.push(
        <option disabled={i > available} key={i} value={i}>
          {i}
        </option>
      );
    }
    return elements;
  }

  const { updateCart, deleteFromCart } = useContext(DataContext);
  const [quantityOptions, setQuantityOptions] = useState(renderQuantityOptions);
  const [quantity, setQuantity] = useState(product.quantity);

  function handleQuantityChange(e) {
    setQuantity(e.target.value);
    updateCart(product.id, product.size, Number(e.target.value));
  }

  return (
    <Col xs={12} lg={6}>
      <article className="shadow-sm border p-3">
        <Row>
          <Col xs={3}>
            <ProductPhoto product={product} component={"Cart"} />
          </Col>

          <Col xs={9}>
            <section className="position-relative">
              <Stack gap={2}>
                <div className={`product-preview-title`}>
                  <Link to={`/produkty/${product.id}`}>{product.title}</Link>
                </div>

                {product.size ? (
                  <span>
                    Rozmiar:{" "}
                    <strong className="text-main">{product.size}</strong>
                  </span>
                ) : (
                  <br />
                )}

                <span>
                  Suma:{" "}
                  <strong className="text-main">
                    {product.price * product.quantity} PLN
                  </strong>
                </span>

                <Stack direction="horizontal" className="my-2">
                  <Form.Select
                    onChange={(e) => handleQuantityChange(e)}
                    value={quantity}
                    aria-label="Wybór ilości"
                    className="rounded-0 me-3"
                  >
                    {quantityOptions}
                  </Form.Select>
                  <button
                    className=""
                    onClick={() => deleteFromCart(product, product.size)}
                  >
                    <i className="bi bi-trash fs-4"></i>
                  </button>
                </Stack>
              </Stack>
            </section>
          </Col>
        </Row>
      </article>
    </Col>
  );
}
