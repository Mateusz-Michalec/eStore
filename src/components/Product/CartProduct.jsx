import React, { useState } from "react";
import { Form, Col, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductPhoto from "./ProductPhoto";

export default function CartProduct({ product, updateCart, deleteFromCart }) {
  const [quantity, setQuantity] = useState(product.quantity);

  function handleQuantityChange(e) {
    setQuantity(e.target.value);
    updateCart(product, Number(e.target.value));
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

                <Stack direction="horizontal" gap={3}>
                  <div>
                    <span>Suma: </span>
                    <strong className="text-main">
                      {product.price * product.quantity} PLN
                    </strong>
                  </div>
                  <span className="text-secondary">
                    ({product.quantity} x {product.price} PLN)
                  </span>
                </Stack>

                <Stack direction="horizontal" className="my-2">
                  <Form.Select
                    onChange={(e) => handleQuantityChange(e)}
                    value={quantity}
                    aria-label="Wybór ilości"
                    className="rounded-0 me-3"
                  >
                    {[...Array(20)].map((x, i) => (
                      <option
                        disabled={i + 1 > product.available}
                        key={i + 1}
                        value={i + 1}
                      >
                        {i + 1}
                      </option>
                    ))}
                  </Form.Select>
                  <button className="" onClick={() => deleteFromCart(product)}>
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
