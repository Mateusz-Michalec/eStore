import React, { useState } from "react";
import { Form, Col, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductPhoto from "../../components/Product/ProductPhoto";
import { useDispatch } from "react-redux";
import { deleteFromCart, updateQuantity } from "./cartSlice";

export default function CartProduct({ product }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(product.quantity);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
    dispatch(
      updateQuantity({
        id: product.id,
        size: product?.size,
        quantity: Number(e.target.value),
      })
    );
  };

  const handleDeleteItem = () => {
    dispatch(deleteFromCart({ id: product.id, size: product?.size }));
  };

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
                  <button onClick={() => handleDeleteItem()}>
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
