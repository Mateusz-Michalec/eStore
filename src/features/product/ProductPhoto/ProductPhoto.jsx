import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import ConditionalLink from "../../../components/common/ConditionalLink";
import {
  checkIsFavorite,
  toggleFavorite,
} from "../../../features/favorites/favoritesSlice";
import { useDispatch, useSelector } from "react-redux";
import "./ProductPhoto.scss";
import { showAlert } from "../../alert/alertSlice";

export default function ProductPhoto({ product, component }) {
  const dispatch = useDispatch();

  // Modal Img
  const [showModalImg, setShowModalImg] = useState(false);
  const handleCloseModalImg = () => setShowModalImg(false);
  const handleShowModalImg = () => setShowModalImg(true);
  // Modal Img End

  const isFavorite = useSelector((state) => checkIsFavorite(state, product.id));

  const handleFavorite = () => {
    dispatch(toggleFavorite(product.id));
    if (isFavorite)
      dispatch(showAlert("Usunięto produkt z ulubionych!", "favorites"));
    else dispatch(showAlert("Dodano produkt do ulubionych!", "favorites"));
  };

  let imgClass;
  switch (component) {
    case "Product":
      imgClass = "product-photo--big";
      break;
    case "ProductsInCategory":
      imgClass = "product-photo--medium";
      break;
    default:
      imgClass = "product-photo--small";
  }

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
          component === "Cart"
            ? ""
            : "border shadow-sm d-flex position-relative align-items-center justify-content-center h-100"
        } 
        `}
      >
        <ConditionalLink
          path={`/products/${product.id}`}
          condition={component !== "Product"}
          children={
            <img
              className={`product-photo ${imgClass} mx-auto my-4 d-block 
                `}
              src={product.image}
              alt={product.title}
              onClick={component === "Product" ? handleShowModalImg : null}
            />
          }
        />
        {component !== "Cart" ? (
          <button
            className="position-absolute top-0 end-0 py-3 px-4"
            onClick={() => handleFavorite()}
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
