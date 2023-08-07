import React, { useEffect, useState } from "react";

import { images } from "../../constants";
import { Link } from "react-router-dom";

import {
  useGetAllProductsQuery,
  useGetCarouselProductsQuery,
  useGetCategoriesQuery,
} from "../../features/api/fakeStoreApi";

import {
  Button,
  Row,
  Col,
  Carousel,
  Collapse,
  Container,
} from "react-bootstrap";
import { SearchUtils } from "../../utils";

export default function Home() {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mostPopularProduct, setMostPopularProduct] = useState();

  const { data: categories } = useGetCategoriesQuery();
  const { data: allProducts } = useGetAllProductsQuery();
  const { data: carouselProducts, isLoading: isLoadingCarousel } =
    useGetCarouselProductsQuery();

  useEffect(() => {
    setMostPopularProduct(SearchUtils.getMostPopularProduct(allProducts));
  }, [allProducts]);

  return (
    <main className="p-4">
      <Container>
        <Link to="/club" className="text-center mb-4 d-block">
          Chcesz 10% rabatu i bezpłatne dostawy?
          <br />
          Zostań Klubowiczem!
        </Link>

        <div className="position-relative p-0">
          <Link to="/products/category/jewelery">
            <div className="hero-body position-absolute w-100 text-center text-main">
              <h2 className="mb-1">Przygotuj się na lato</h2>
              <p className="mb-5">Modne dodatki w atrakcyjnych cenach.</p>
            </div>
            <img src={images.hero} className="w-100 hero-img" alt="Plaża" />
          </Link>
        </div>

        <section className="text-center section-1-bg mt-4 p-4">
          <h5 className="text-main">
            Odśwież swoją szafę na lato!
            <br />
            Nowe produkty w niższych cenach
          </h5>
          <p className="text-secondary fs-7 mb-0">
            Oferta tylko dla Klubowiczów. Obowiązuje na wybrane produkty do
            3.05.2023. Nie łączy się z innymi promocjami.
          </p>
          {categories ? (
            <button
              className="mt-4"
              type="button"
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              aria-controls="categories"
              aria-expanded={categoriesOpen}
            >
              <i className="bi bi-plus-circle fs-2 text-main"></i>
            </button>
          ) : null}
        </section>
        <section>
          <Collapse in={categoriesOpen} className="section-1-bg">
            <div id="categories" className="p-0">
              {categories?.map((category) => (
                <Row key={`${category}-home`}>
                  <Link to={`/products/category/${category}`}>
                    <Col className="d-flex category-col p-3 justify-content-between align-items-center">
                      <span className="m-0 d-inline-block">{category}</span>
                      <button type="button">
                        <i className="bi bi-chevron-right fs-5"></i>
                      </button>
                    </Col>
                  </Link>
                </Row>
              ))}
            </div>
          </Collapse>
        </section>
        <section className="mt-5">
          <h4 className="mb-4 text-sm-center">Zainspiruj się</h4>

          {isLoadingCarousel ? (
            <div className="loader" />
          ) : (
            <Carousel className="mx-auto">
              {carouselProducts.map((product) => (
                <Carousel.Item key={product.id}>
                  <Link to={`/products/${product.id}`}>
                    <img
                      className="d-block vh-30 w-100 img-contain"
                      src={product.image}
                      alt={product.title}
                    />
                    <Carousel.Caption className="text-dark bg-white p-3 border rounded">
                      <h5 className="m-0">{product.title}</h5>
                    </Carousel.Caption>
                  </Link>
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </section>
        <section className="section-2-bg text-white p-4 text-center mt-5">
          <h3 className="ls-2 ">Newsletter</h3>
          <p>
            Zapisz się do naszego newslettera!
            <br />
            Nie ominie Cię żadna okazja oraz nowości!
          </p>
          <Link to="/newsletter">
            <Button variant="outline-light link">
              Zapisz się do Newslettera
            </Button>
          </Link>
        </section>

        {mostPopularProduct ? (
          <section className="mt-5 mb-4 border border-2 p-4">
            <Link to={`/products/${mostPopularProduct?.id}`}>
              <img
                className="d-block mx-auto vh-30 img-contain"
                src={mostPopularProduct.image}
                alt={mostPopularProduct.title}
              />
              <h3 className="text-center mt-4 mb-0">Na fali</h3>
            </Link>
          </section>
        ) : (
          <div className="loader"></div>
        )}
      </Container>
    </main>
  );
}
