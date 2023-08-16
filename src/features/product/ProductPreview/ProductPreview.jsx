import React from "react";
import { Link } from "react-router-dom";

import ProductPhoto from "../ProductPhoto/ProductPhoto";
import "./ProductPreview.scss";

export default function ProductPreview({ product, component }) {
  return (
    <div>
      <ProductPhoto product={product} component={component} />
      <section>
        <div className="product-preview__title mt-1">
          <Link to={`/products/${product.id}`}>{product.title}</Link>
        </div>
        {component !== "LastVieved" ? (
          <p className="fs-7 mb-0 text-main">{product.price} PLN</p>
        ) : null}
      </section>
    </div>
  );
}
