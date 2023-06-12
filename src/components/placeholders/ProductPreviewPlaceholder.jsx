import React from "react";
import { Placeholder } from "react-bootstrap";

export default function ProductPreviewPlaceholder() {
  return (
    <div className="glow">
      <Placeholder className="w-100 opacity-25 product-preview-placeholder" />
      <Placeholder className="w-75 opacity-25 mt-1 d-block" />
      <Placeholder className="w-25 opacity-25 d-block mt-1" />
    </div>
  );
}
