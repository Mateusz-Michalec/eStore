import React, { useContext, useState } from "react";
import DataContext from "../context/dataContext";
import { Row, Col, Placeholder } from "react-bootstrap";
import ProductPreview from "./ProductPreview";
import ProductPreviewPlaceholder from "./ProductPreviewPlaceholder";

export default function ProductsHistory({ currentProductId }) {
  const { getMultipleProducts, historyProducts } = useContext(DataContext);

  const [productsHistory, setProductsHistory] = getMultipleProducts(
    historyProducts.filter((id) => id !== currentProductId)
  );

  if (historyProducts.length > 0) {
    return (
      <section className="mt-5 px-3 px-lg-4">
        <h5 className="mb-3">Ostatnio oglądane</h5>
        <Row className="flex-nowrap" style={{ overflowX: "auto" }}>
          {productsHistory
            ? productsHistory.map((product) => (
                <Col xs={8} sm={6} md={5} lg={3} xl={2} key={`h_${product.id}`}>
                  <ProductPreview
                    product={product}
                    component={"ProductHistory"}
                  />
                </Col>
              ))
            : historyProducts.map((id) => (
                <Col xs={8} sm={6} md={5} lg={3} xl={2} key={`h_${id}`}>
                  <ProductPreviewPlaceholder />
                </Col>
              ))}
        </Row>
      </section>
    );
  } else return null;
}
