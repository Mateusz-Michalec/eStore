import React, { useContext, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { Alert, Breadcrumb, Modal, ModalBody, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ImagePlaceholder from "../components/ImagePlaceholder";
import DataContext from "../context/dataContext";
import useTimeoutAlert from "../hooks/useTimeoutAlert";
import { roundHalf } from "../utils";
import useInView from "../hooks/useInView";
import Sizes from "../components/Sizes";

export default function Product() {
  // Data Context
  const {
    toggleFavoriteProduct,
    checkIsAlreadyAdded,
    favorites,
    products,
    addToCart,
  } = useContext(DataContext);
  // Data Context End

  // Get Product
  const { id } = useParams();
  const product = products?.find((item) => item.id === Number(id));
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
      addToCart((prev) => [...prev, { ...product, size: selectedSize }]);
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

  // Modal Img
  const [showModalImg, setShowModalImg] = useState(false);
  const handleCloseModalImg = () => setShowModalImg(false);
  const handleShowModalImg = () => setShowModalImg(true);
  // Modal Img End

  // Favorite Product
  const [alertShow, setAlertShow] = useTimeoutAlert(1500);

  function handleFavorite(e) {
    e.stopPropagation();
    toggleFavoriteProduct(product);
    setAlertShow(!alertShow);
  }

  let isFavorite;
  if (product) isFavorite = checkIsAlreadyAdded(product, favorites);
  // Favorite Product End

  function renderStarRating() {
    const stars = [];
    let rating = roundHalf(product.rating.rate);
    const isHalf = rating % 2 !== 0;
    if (isHalf) rating = rating - 0.5;
    let icon;

    for (let i = 0; i < 5; i++) {
      if (i < rating) icon = "bi-star-fill";
      else if (i == rating && isHalf) icon = "bi-star-half";
      else icon = "bi-star";
      stars.push(<i key={i} className={`bi ${icon}`}></i>);
    }

    return stars;
  }

  return (
    <main className="p-4 min-vh-100">
      <Modal
        size="lg"
        centered
        show={showModalImg}
        onHide={handleCloseModalImg}
      >
        <Modal.Header closeButton></Modal.Header>
        <ModalBody>
          <img src={product?.image} alt={product?.title} className="w-100" />
        </ModalBody>
      </Modal>
      {product ? (
        <Breadcrumb className="fs-7 d-flex justify-content-center">
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
      ) : null}
      {product ? (
        <article className="d-flex flex-column mb-4">
          <section
            className="shadow-lg border position-relative p-5 pointer "
            onClick={handleShowModalImg}
          >
            <button
              className="position-absolute right-corner "
              onClick={handleFavorite}
            >
              <i
                className={`${
                  isFavorite ? "text-danger bi-heart-fill" : "bi-heart"
                } bi fs-4 nav-icon `}
              ></i>
              <Alert
                show={alertShow}
                variant="danger"
                className="position-absolute end-100 rounded-0 rounded-bottom rounded-start pointer-none"
              >
                {`${
                  isFavorite
                    ? "Dodano do ulubionych!"
                    : "Usunięto z ulubionych!"
                }`}
              </Alert>
            </button>
            <img src={product.image} alt={product.title} className="w-100" />
          </section>
          <section>
            <div className="mt-1">
              <span className="fs-7">
                Ocena {product.rating.rate} ({product.rating.count} recenzji)
              </span>
              <Stack direction="horizontal" gap={2}>
                {renderStarRating()}
              </Stack>
            </div>
            <h1 className="h5 mt-2">{product.title}</h1>
            <h2 className="h6 mt-2 text-danger">{product.price} PLN</h2>
          </section>
          <section className="mt-3" ref={sizesRef}>
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
                ? "mt-4"
                : "fixed-bottom px-4 py-3 bg-white border-1 border-top shadow"
            }`}
          >
            <button
              ref={addToCartRef}
              className="bg-dark text-white py-3 w-100"
              onClick={() => handleAddToCart()}
            >
              <i className="bi bi-bag me-2 text-white"></i>
              <strong>Dodaj</strong>
            </button>
          </div>
        </article>
      ) : (
        <ImagePlaceholder />
      )}
    </main>
  );
}
