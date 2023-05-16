import React, { useContext } from "react";
import { Col, Form, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import Sizes from "./Sizes";
import DataContext from "../context/dataContext";

export default function ProductPreview({ product, type }) {
  const { toggleFavoriteProduct } = useContext(DataContext);

  console.log(product);
  return (
    <Col xs={6} md={4}>
      <article className="product-preview h-100">
        <section className="border shadow-sm p-4 pb-5 position-relative">
          <Link to={`/produkty/${product.id}`}>
            <img
              className="w-100 product-preview-img img-contain"
              src={product.image}
              alt={product.title}
            />
          </Link>
          <button
            className="position-absolute bottom-right"
            onClick={() => toggleFavoriteProduct(product)}
          >
            <i className="bi bi-trash fs-5"></i>
          </button>
        </section>
        <section>
          <div className="product-preview-title">
            <Link to={`/produkty/${product.id}`}>{product.title}</Link>
          </div>
          <p className="fs-7 mb-3">{product.price} PLN</p>
          <Sizes sizes={product.sizes} type={type} />
        </section>
      </article>
    </Col>
  );
}
