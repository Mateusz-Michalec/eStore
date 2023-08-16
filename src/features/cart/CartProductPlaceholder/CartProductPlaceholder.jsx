import React from "react";
import { Col, Placeholder, Row, Stack } from "react-bootstrap";
import "./CartProductPlaceholder.scss";

export default function CartProductPlaceholder() {
  return (
    <Col xs={12} className="glow cart-product-placeholder">
      <Placeholder bg="secondary" className="w-100 p-4 opacity-25">
        <Row className="g-4 align-items-center">
          <Col xs={12} sm={4} md={5} className="d-flex justify-content-center">
            <i className="bi bi-camera cart-product-placeholder__photo opacity-75" />
          </Col>
          <Col xs={12} sm={8} md={7}>
            <Stack gap={2}>
              <Placeholder size="lg" xs={10} />
              <Placeholder size="lg" xs={3} />

              <Stack direction="horizontal" gap={3}>
                <Placeholder size="lg" xs={3} />
                <Placeholder size="lg" xs={3} />
              </Stack>

              <Stack direction="horizontal" className="my-2">
                <Placeholder size="lg" className="me-3" xs={10} />
                <Placeholder.Button variant="dark" xs={1} aria-hidden="true" />
              </Stack>
            </Stack>
          </Col>
        </Row>
      </Placeholder>
    </Col>
  );
}
