import React from "react";
import { Col, Placeholder, Stack } from "react-bootstrap";
import "./FavoriteProductPlaceholder.scss";

export default function FavoriteProductPlaceholder() {
  return (
    <Col
      xs={12}
      md={6}
      xl={4}
      xxl={3}
      className="glow favorite-product-placeholder"
    >
      <Placeholder
        bg="secondary"
        className="w-100 d-flex justify-content-center opacity-25"
      >
        <i className="bi bi-camera d-block favorite-product-placeholder__photo opacity-75"></i>
      </Placeholder>
      <Stack className="mt-2 opacity-25">
        <Placeholder bg="secondary" className="w-75" />
        <Placeholder size="sm" bg="secondary" className="w-25 mt-1" />
      </Stack>
      <Stack direction="horizontal" gap={3} className="mt-2 opacity-25">
        <Placeholder.Button
          variant="secondary"
          className="w-50  py-2  mt-1 rounded-0"
        />
        <Placeholder.Button
          variant="secondary"
          className="w-50  py-2  mt-1 rounded-0"
        />
      </Stack>
    </Col>
  );
}
