import React, { useState } from "react";
import { Form, Col, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductPhoto from "../product/ProductPhoto/ProductPhoto";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart, updateQuantity } from "./cartSlice";
import { getSizeQuantity } from "../sizes/sizesSlice";
import { showAlert } from "../alert/alertSlice";

export default function CartProduct({ product }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(product.quantity);

  const sizeQuantity = useSelector((state) =>
    getSizeQuantity(state, product.id, product?.size)
  );

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

  const renderOptions = () => {
    let options = [];
    const maxQuantity = product.available || sizeQuantity;
    for (let i = 1; i < 21; i++)
      [
        options.push(
          <option disabled={i > maxQuantity} key={i} value={i}>
            {i}
          </option>
        ),
      ];
    return options;
  };

  const handleDeleteItem = () => {
    dispatch(deleteFromCart({ id: product.id, size: product?.size }));
    dispatch(showAlert("Usunięto produkt z koszyka!", "cart"));
  };

  return (
    <Col xs={12}>
      <div className="shadow-sm border p-4">
        <Row className="g-4">
          <Col xs={12} sm={4} md={5}>
            <ProductPhoto product={product} component={"Cart"} />
          </Col>

          <Col xs={12} sm={8} md={7}>
            <section>
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
                    {renderOptions()}
                  </Form.Select>
                  <button onClick={() => handleDeleteItem()}>
                    <i className="bi bi-trash fs-4"></i>
                  </button>
                </Stack>
              </Stack>
            </section>
          </Col>
        </Row>
      </div>
    </Col>
  );
}
