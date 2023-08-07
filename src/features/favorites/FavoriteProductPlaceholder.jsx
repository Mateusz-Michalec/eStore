import React from "react";
import { Col, Placeholder, Stack } from "react-bootstrap";

export default function FavoriteProductPlaceholder() {
  return (
    <Col xs={12} md={6} xl={4} xxl={3} className="glow">
      <Placeholder
        bg="secondary"
        className="w-100 opacity-25 placeholder-img"
      />
      <Stack className="mt-2 opacity-50 ">
        <Placeholder bg="secondary" className="w-75" />
        <Placeholder size="sm" bg="secondary" className="w-25 mt-1" />
      </Stack>
      <Stack direction="horizontal" gap={3} className="mt-2 opacity-50 ">
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
