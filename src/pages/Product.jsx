import React, { useContext, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Breadcrumb,
  Button,
  Container,
  Row,
  Col,
  Stack,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ImagePlaceholder from "../components/ImagePlaceholder";
import DataContext from "../context/dataContext";
import useInView from "../hooks/useInView";
import Sizes from "../components/Sizes";
import StarsRating from "../components/StarsRating";
import ProductPhoto from "../components/ProductPhoto";
import useFetch from "../hooks/useFetch";

export default function Product() {
  // Data Context
  const { addToCart, getSingleProduct } = useContext(DataContext);
  // Data Context End

  // Get Product
  const { id } = useParams();
  const [product] = getSingleProduct(id);

  console.log(product);
  // Get Product End

  // AddToCart Btn intersecting
  const addToCartRef = useRef();
  const sizesRef = useRef();
  const isIntersectingSizes = useInView(sizesRef, product);
  // AddToCart Btn intersecting end

  // AddToCart
  function handleAddToCart() {
    if (selectedSize) {
      setIsSizeSelected(true);
      addToCart(product, selectedSize);
    } else {
      window.scrollTo({ top: sizesRef.current.offsetTop - 100 });
      setIsSizeSelected(false);
    }
  }
  // AddToCart End

  // Sizes
  const [isLowSizes, setIsLowSizes] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const [isSizeSelected, setIsSizeSelected] = useState();

  function handleSizeSelect(e) {
    setSelectedSize(e.currentTarget.id);
    setIsSizeSelected(true);
  }
  // Sizes End

  return (
    <main className="p-4 min-vh-100">
      {product ? (
        <article className="d-flex flex-column mb-4">
          <Breadcrumb className="fs-7 d-flex justify-content-center mb-2">
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item
              linkAs={Link}
              linkProps={{ to: `/produkty/kategoria/${product.category}` }}
            >
              {product.category}
            </Breadcrumb.Item>
            <Breadcrumb.Item active>{product.title}</Breadcrumb.Item>
          </Breadcrumb>
          <Container>
            <Row className="gap-3">
              <Col sm={12} md={6}>
                <ProductPhoto product={product} component="Product" />
              </Col>
              <Col>
                <section>
                  <h1 className="h4 mb-1">{product.title}</h1>
                  <h2 className="h5 mb-0 text-danger">{product.price} PLN</h2>
                </section>
                {/* <StarsRating
                  ratingRate={product.rating.rate}
                  ratingCount={product.rating.count}
                /> */}
                <section ref={sizesRef}>
                  <Stack direction="horizontal" className="mb-2">
                    <Stack>
                      <span>Rozmiary</span>
                      {isSizeSelected === false ? (
                        <span className="text-danger">Wybierz rozmiar</span>
                      ) : null}
                    </Stack>
                    {isLowSizes ? (
                      <Stack direction="horizontal" className="ms-auto fs-7">
                        <i className="bi bi-circle-fill text-danger me-1 fs-8"></i>{" "}
                        <span>Zostało tylko kilka sztuk!</span>
                      </Stack>
                    ) : null}
                  </Stack>
                  <Stack direction="horizontal" className="flex-wrap" gap={3}>
                    <Sizes
                      component="Product"
                      sizes={product.sizes}
                      setIsLowSizes={() => setIsLowSizes(true)}
                      selectedSize={selectedSize}
                      handleSizeSelect={(e) => handleSizeSelect(e)}
                    />
                  </Stack>
                </section>

                <div
                  className={`${
                    isIntersectingSizes
                      ? "mt-3"
                      : "fixed-bottom fixed-btn px-4 py-3 bg-white border-1 border-top shadow"
                  }`}
                >
                  <Button
                    variant={isSizeSelected ? "dark" : "secondary"}
                    ref={addToCartRef}
                    className="rounded-0 py-3 w-100"
                    onClick={() => handleAddToCart()}
                  >
                    <i className="bi bi-bag me-2 text-white"></i>
                    <strong className="ls-1">Dodaj</strong>
                  </Button>
                </div>
                <section className="mt-4 ls-1">
                  <h3 className="h5">Opis</h3>
                  <p className=" text-secondary">{product.description}</p>
                </section>
              </Col>
            </Row>
          </Container>
        </article>
      ) : (
        <ImagePlaceholder />
      )}
    </main>
  );
}
