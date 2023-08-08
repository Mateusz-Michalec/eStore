import React from "react";
import { Col, Placeholder } from "react-bootstrap";

export default function CartProductPlaceholder() {
  return (
    <Col xs={12} lg={6} className="glow">
      <Placeholder
        bg="secondary"
        className="w-100 opacity-25 product-cart-placeholder"
      />
    </Col>
  );
}
