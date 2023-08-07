import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Breadcrumb,
  Button,
  Container,
  Row,
  Col,
  Stack,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import useInView from "../../hooks/useInView";
import Sizes from "../Product/Sizes";
import StarsRating from "../Product/StarsRating";
import ProductPhoto from "../Product/ProductPhoto";
import ProductsHistory from "../Product/ProductsHistory";

import { useGetProductQuery } from "../../features/api/fakeStoreApi";
import { addToCart } from "../../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { getSizeQuantity } from "../../features/sizesSlice";

export default function Product() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, isLoading, isError } = useGetProductQuery(id);

  useEffect(() => {
    if (isError) navigate("/");
  }, [isError]);

  // Sizes
  const [isLowSizes, setIsLowSizes] = useState();
  const [selectedSize, setSelectedSize] = useState("");
  const [isSizeSelected, setIsSizeSelected] = useState();

  function handleSizeSelect(e) {
    setSelectedSize(e.currentTarget.id);
    setIsSizeSelected(true);
  }
  // Sizes End

  const sizeQuantity = useSelector((state) =>
    getSizeQuantity(state, product?.id, selectedSize)
  );

  console.log(sizeQuantity);

  // AddToCart Btn intersecting
  const addToCartRef = useRef();
  const sizesRef = useRef();
  const isIntersectingSizes = useInView(sizesRef, product);
  // AddToCart Btn intersecting end

  function handleAddToCart() {
    if (product.sizes) {
      if (selectedSize) {
        setIsSizeSelected(true);
        dispatch(
          addToCart({
            id: product.id,
            size: selectedSize,
            sizeQuantity: sizeQuantity,
          })
        );
      } else {
        window.scrollTo({ top: sizesRef.current.offsetTop - 85 });
        setIsSizeSelected(false);
      }
    } else {
      dispatch(addToCart({ id: product.id, available: product.available }));
    }
  }

  return (
    <main className="my-5 px-3 px-lg-5">
      {product ? (
        <>
          <article className="d-flex flex-column mb-4">
            <Breadcrumb className="fs-7 d-flex justify-content-center mb-4">
              <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
                Home
              </Breadcrumb.Item>
              <Breadcrumb.Item
                linkAs={Link}
                linkProps={{ to: `/products/category/${product.category}` }}
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
                  <StarsRating
                    ratingRate={product.rating.rate}
                    ratingCount={product.rating.count}
                  />
                  {product.sizes ? (
                    <section ref={sizesRef}>
                      <Stack direction="horizontal" className="mb-2">
                        <Stack>
                          <span>Rozmiary</span>
                          {isSizeSelected === false ? (
                            <span className="text-danger">Wybierz rozmiar</span>
                          ) : null}
                        </Stack>
                        {isLowSizes ? (
                          <Stack
                            direction="horizontal"
                            className="ms-auto fs-7"
                          >
                            <i className="bi bi-circle-fill text-danger me-1 fs-8"></i>{" "}
                            <span>Zostało tylko kilka sztuk!</span>
                          </Stack>
                        ) : null}
                      </Stack>
                      <Stack
                        direction="horizontal"
                        className="flex-wrap"
                        gap={3}
                      >
                        <Sizes
                          component="Product"
                          sizes={product.sizes}
                          setIsLowSizes={() => setIsLowSizes(true)}
                          selectedSize={selectedSize}
                          handleSizeSelect={(e) => handleSizeSelect(e)}
                        />
                      </Stack>
                    </section>
                  ) : null}

                  {!isIntersectingSizes ? (
                    <div className="fixed-bottom fixed-btn d-md-none px-4 py-3 bg-white border-1 border-top shadow">
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
                  ) : null}
                  <Button
                    variant={isSizeSelected ? "dark" : "secondary"}
                    ref={addToCartRef}
                    className="rounded-0 py-3 mt-3 w-100"
                    onClick={() => handleAddToCart()}
                  >
                    <i className="bi bi-bag me-2 text-white"></i>
                    <strong className="ls-1">Dodaj</strong>
                  </Button>
                  <section className="mt-4 ls-1">
                    <h3 className="h5">Opis</h3>
                    <p className=" text-secondary">{product.description}</p>
                  </section>
                </Col>
              </Row>
            </Container>
          </article>
          <ProductsHistory
            currentProduct={{
              id: product.id,
              title: product.title,
              image: product.image,
              price: product.price,
              available: product.available,
              sizes: product.sizes,
            }}
          />
        </>
      ) : (
        <div className="loader" />
      )}
    </main>
  );
}
