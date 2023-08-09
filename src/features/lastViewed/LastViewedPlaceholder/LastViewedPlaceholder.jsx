import React from "react";
import "./lastViewedPlaceholder.scss";
import { Placeholder, Col } from "react-bootstrap";

const lastViewedPlaceholder = () => {
  return (
    <Col
      className="last-viewed-placeholder glow"
      xs={8}
      sm={6}
      md={5}
      lg={3}
      xl={2}
    >
      <h5 className="mb-3">Ostatnio oglądane</h5>
      <Placeholder
        bg="secondary"
        xs={12}
        className="d-flex justify-content-center opacity-25"
      >
        <i className="bi bi-camera last-viewed-placeholder__img opacity-75" />
      </Placeholder>
      <Placeholder bg="secondary" size="lg" className="opacity-25" xs={12} />
    </Col>
  );
};

export default lastViewedPlaceholder;
