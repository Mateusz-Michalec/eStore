import React, { useContext, useState } from "react";

import hero from "../assets/img/hero.jpg";
import { Link } from "react-router-dom";

import DataContext from "../context/dataContext";
import useFetch from "../hooks/useFetch";

import {
  Button,
  Row,
  Col,
  Carousel,
  Collapse,
  Container,
} from "react-bootstrap";
import ImagePlaceholder from "../components/ImagePlaceholder";

export default function Home() {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const { categories, products } = useContext(DataContext);

  const [carouselProducts] = useFetch(
    "https://fakestoreapi.com/products?limit=5"
  );

  let mostPopularProduct;
  if (products)
    mostPopularProduct = products.reduce((prev, current) =>
      prev.rating.count > current.rating.count ? prev : current
    );

  return (
    <main className="p-4">
      <Link to="/club" className="text-center mb-4 d-block">
        Chcesz 10% rabatu i bezpłatne dostawy?
        <br />
        Zostań Klubowiczem!
      </Link>
      <Link to="/produkty/kategoria/jewelery">
        <Container className="position-relative overflow-hidden p-0">
          <div className="hero-body position-absolute w-100 text-center text-main">
            <h2 className="mb-1">Przygotuj się na lato</h2>
            <p className="mb-5">Modne dodatki w atrakcyjnych cenach.</p>
          </div>
          <img
            src={hero}
            className="img-fluid w-100"
            style={{ maxHeight: "50vh" }}
            alt="Plaża"
          />
        </Container>
      </Link>
      <section>
        <Container className="text-center section-1-bg mt-4 p-4">
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
        </Container>
      </section>
      <section>
        <Collapse in={categoriesOpen} className="section-1-bg">
          <Container id="categories" className="p-0">
            {categories?.map((category) => (
              <Row key={`${category}-home`}>
                <Link to={`/produkty/kategoria/${category}`}>
                  <Col className="d-flex category-col p-3 justify-content-between align-items-center">
                    <span className="m-0 d-inline-block">{category}</span>
                    <button type="button">
                      <i className="bi bi-chevron-right fs-5"></i>
                    </button>
                  </Col>
                </Link>
              </Row>
            ))}
          </Container>
        </Collapse>
      </section>
      <section className="mt-5">
        <h4 className="mb-4 text-sm-center">Zainspiruj się</h4>
        <Container>
          {carouselProducts ? (
            <Carousel className="mx-auto max-800">
              {carouselProducts.map((product) => (
                <Carousel.Item key={product.id}>
                  <Link to={`/produkty/${product.id}`}>
                    <img
                      className="d-block w-100 max-vh-35 img-contain"
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
          ) : (
            <ImagePlaceholder />
          )}
        </Container>
      </section>
      <section className="mt-5">
        <Container className="section-2-bg text-white p-4 text-center">
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
        </Container>
      </section>
      <section className="mt-5 mb-4">
        {mostPopularProduct ? (
          <Link to={`/produkty/${mostPopularProduct?.id}`}>
            <Container className="border border-3 p-4">
              <img
                className="d-block mx-auto max-vh-35 img-contain"
                src={mostPopularProduct.image}
                alt={mostPopularProduct.title}
              />

              <h3 className="text-center mt-4 mb-0">Na fali</h3>
            </Container>
          </Link>
        ) : (
          <ImagePlaceholder />
        )}
      </section>
    </main>
  );
}
