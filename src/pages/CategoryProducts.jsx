import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Alert, Breadcrumb, Modal, ModalBody, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ImagePlaceholder from "../components/ImagePlaceholder";
import DataContext from "../context/dataContext";
import useTimeoutAlert from "../hooks/useTimeoutAlert";
import { roundHalf, usdToPLN } from "../utils";

export default function CategoryProducts() {
  function getRandomSizes() {
    const getRandomNumber = () => Math.floor(Math.random() * 15);

    return [
      { xs: getRandomNumber() },
      { s: getRandomNumber() },
      { m: getRandomNumber() },
      { l: getRandomNumber() },
      { xl: getRandomNumber() },
      { xxl: getRandomNumber() },
    ];
  }

  // Fetch
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, error] = useFetch(`https://fakestoreapi.com/products/${id}`);
  if (error) navigate("/");
  // End Fetch

  const [sizes, setSizes] = useState(getRandomSizes());

  console.log(product);

  // Modal Img
  const [showModalImg, setShowModalImg] = useState(false);
  const handleCloseModalImg = () => setShowModalImg(false);
  const handleShowModalImg = () => setShowModalImg(true);
  // End Modal Img

  // Favorite Product
  const { toggleFavoriteProduct, checkIsFavorite } = useContext(DataContext);
  const [alertShow, setAlertShow] = useTimeoutAlert(1500);

  function handleFavorite(e) {
    e.stopPropagation();
    toggleFavoriteProduct(product);
    setAlertShow(!alertShow);
  }

  let isFavorite;
  if (product) isFavorite = checkIsFavorite(product);

  // End Favorite Product

  function renderStarRating() {
    const stars = [];
    let rating = roundHalf(product.rating.rate);
    const isHalf = rating % 2 !== 0;
    if (isHalf) rating = rating - 0.5;

    for (let i = 0; i < 5; i++) {
      let icon;
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
            <div>
              <span>Ocena {product.rating.rate}</span>
              <Stack direction="horizontal" gap={2}>
                {renderStarRating()}
              </Stack>
            </div>
            <h1 className="h5 mt-4">{product.title}</h1>
            <h2 className="h6 mt-2 opacity-75">
              {usdToPLN(product.price)} PLN
            </h2>
          </section>
<<<<<<< Updated upstream:src/pages/CategoryProducts.jsx
=======
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
                type="Product"
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
>>>>>>> Stashed changes:src/pages/Product.jsx
        </article>
      ) : (
        <ImagePlaceholder />
      )}
    </main>
  );
}
