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
import Sizes from "./Sizes";
import StarsRating from "./StarsRating";
import ProductPhoto from "./ProductPhoto/ProductPhoto";
import LastViewed from "../../features/lastViewed/LastViewed";

import { useGetProductQuery } from "../../features/api/fakeStoreApi";
import { addToCart } from "../../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  getSizeQuantity,
  selectSizesByProductId,
} from "../../features/sizesSlice";
import { changeProductData } from "../../utils/ProductDataManipulation";

export default function Product() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  // Sizes
  const [selectedSize, setSelectedSize] = useState("");

  const productSizes = useSelector((state) =>
    selectSizesByProductId(state, id)
  );

  const sizeQuantity = useSelector((state) =>
    getSizeQuantity(state, id, selectedSize)
  );
  // Sizes End

  const {
    data: product,
    isLoading,
    isError,
    isSuccess,
  } = useGetProductQuery(id);

  const [transformedProduct, setTransformedProduct] = useState(null);

  useEffect(() => {
    if (isError) navigate("/");
    if (isSuccess)
      setTransformedProduct(changeProductData(product, productSizes));
  }, [isLoading]);

  // AddToCart Btn intersecting
  const addToCartRef = useRef();
  const sizesRef = useRef();
  const isIntersectingSizes = useInView(sizesRef, product);
  // AddToCart Btn intersecting end

  function handleAddToCart() {
    if (transformedProduct.sizes) {
      if (selectedSize) {
        dispatch(
          addToCart({
            id: transformedProduct.id,
            size: selectedSize,
            sizeQuantity: sizeQuantity,
          })
        );
      } else window.scrollTo({ top: sizesRef.current.offsetTop - 85 });
    } else
      dispatch(
        addToCart({
          id: transformedProduct.id,
          available: transformedProduct.available,
        })
      );
  }

  return (
    <>
      {transformedProduct ? (
        <>
          <article className="d-flex flex-column mb-4">
            <Breadcrumb className="fs-7 d-flex justify-content-center mb-4">
              <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
                Home
              </Breadcrumb.Item>
              <Breadcrumb.Item
                linkAs={Link}
                linkProps={{
                  to: `/products/category/${transformedProduct.category}`,
                }}
              >
                {transformedProduct.category}
              </Breadcrumb.Item>
              <Breadcrumb.Item active>
                {transformedProduct.title}
              </Breadcrumb.Item>
            </Breadcrumb>
            <Container>
              <Row className="gap-3">
                <Col sm={12} md={6}>
                  <ProductPhoto
                    product={transformedProduct}
                    component="Product"
                  />
                </Col>
                <Col>
                  <section>
                    <h1 className="h4 mb-1">{transformedProduct.title}</h1>
                    <h2 className="h5 mb-0 text-danger">
                      {transformedProduct.price} PLN
                    </h2>
                  </section>
                  <StarsRating
                    ratingRate={transformedProduct.rating.rate}
                    ratingCount={transformedProduct.rating.count}
                  />
                  {transformedProduct.sizes ? (
                    <section ref={sizesRef}>
                      <Sizes
                        component="Product"
                        sizes={transformedProduct.sizes}
                        selectedSize={selectedSize}
                        handleSizeSelect={(e) =>
                          setSelectedSize(e.currentTarget.id)
                        }
                      />
                    </section>
                  ) : null}

                  {!isIntersectingSizes ? (
                    <div className="fixed-bottom fixed-btn d-md-none px-4 py-3 bg-white border-1 border-top shadow">
                      <Button
                        variant={!selectedSize ? "dark" : "secondary"}
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
                    variant={!selectedSize ? "dark" : "secondary"}
                    ref={addToCartRef}
                    className="rounded-0 py-3 mt-3 w-100"
                    onClick={() => handleAddToCart()}
                  >
                    <i className="bi bi-bag me-2 text-white"></i>
                    <strong className="ls-1">Dodaj</strong>
                  </Button>
                  <section className="mt-4 ls-1">
                    <h3 className="h5">Opis</h3>
                    <p className=" text-secondary">
                      {transformedProduct.description}
                    </p>
                  </section>
                </Col>
              </Row>
            </Container>
          </article>
          {isSuccess ? <LastViewed productId={transformedProduct.id} /> : null}
        </>
      ) : (
        <div className="loader" />
      )}
    </>
  );
}
