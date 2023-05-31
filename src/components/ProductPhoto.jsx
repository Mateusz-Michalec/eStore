import React, { useContext, useState } from "react";
import DataContext from "../context/dataContext";
import { Modal } from "react-bootstrap";
import ConditionalLink from "./ConditionalLink";

export default function ProductPhoto({ product, component }) {
  const { toggleFavoriteProduct, checkIsAlreadyAdded, favorites } =
    useContext(DataContext);

  // Modal Img
  const [showModalImg, setShowModalImg] = useState(false);
  const handleCloseModalImg = () => setShowModalImg(false);
  const handleShowModalImg = () => setShowModalImg(true);
  // Modal Img End

  const isFavorite = checkIsAlreadyAdded(product, favorites, true);

  return (
    <>
      {component === "Product" ? (
        <Modal
          size="lg"
          centered
          show={showModalImg}
          onHide={handleCloseModalImg}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <img src={product.image} alt={product.title} className="w-100" />
          </Modal.Body>
        </Modal>
      ) : null}
      <section
        className={`${
          component !== "Cart" ? "border px-3 shadow-sm position-relative" : ""
        } ${
          component === "Product" || component === "Cart"
            ? "d-flex align-items-center justify-content-center h-100"
            : ""
        }`}
      >
        <ConditionalLink
          path={`/produkty/${product.id}`}
          condition={component !== "Product"}
          children={
            <img
              className={`w-100 ${
                component === "Cart" ? "my-0 product-cart-img" : "my-5 "
              }
            ${
              component !== "Product" ? "product-preview-img" : "px-4"
            }  img-contain cursor-pointer`}
              src={product.image}
              alt={product.title}
              onClick={component === "Product" ? handleShowModalImg : null}
            />
          }
        />
        {component !== "Cart" ? (
          <button
            className="position-absolute top-right"
            onClick={() => toggleFavoriteProduct(product)}
          >
            <i
              className={`bi ${
                component === "Favorites"
                  ? "bi-trash"
                  : isFavorite
                  ? "text-danger bi-heart-fill"
                  : "bi-heart"
              } fs-5`}
            ></i>
          </button>
        ) : null}
      </section>
    </>
  );
}
