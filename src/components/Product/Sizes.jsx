import React, { useEffect, useState, useRef } from "react";
import { Button, Modal, Stack } from "react-bootstrap";

export default function Sizes({
  sizes,
  setIsLowSizes,
  handleSizeSelect,
  selectedSize,
  component,
}) {
  function renderSizes() {}

  const [sizesElements, setSizeElements] = useState(renderSizes);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  useEffect(() => {
    const elements = [];

    if (sizes) {
      sizes.map((size) => {
        for (const prop in size) {
          const quantity = size[prop];
          const isLow = quantity <= 3 && quantity > 0;
          if (isLow && setIsLowSizes) setIsLowSizes();
          const isZero = quantity === 0;
          if (component === "Product") {
            elements.push(
              <Button
                variant="outline-dark"
                key={prop}
                id={prop}
                className={`${isZero ? "disabled" : ""} ${
                  prop === selectedSize ? "selected" : ""
                } py-2 min-width-80px rounded-0`}
                onClick={(e) => handleSizeSelect(e)}
              >
                <Stack
                  direction="horizontal"
                  className="justify-content-center"
                >
                  <Stack direction="horizontal">
                    {isLow && isZero === false ? (
                      <i className="bi bi-circle-fill text-danger fs-8 me-1 mt-1"></i>
                    ) : null}{" "}
                    <span>{prop}</span>
                  </Stack>
                </Stack>
              </Button>
            );
          } else if (component === "Favorites") {
            elements.push(
              <button
                key={prop}
                id={prop}
                className={`${isZero ? "disabled" : ""} 
                 `}
                onClick={(e) => {
                  handleSizeSelect(e);
                  handleCloseModal();
                }}
              >
                <Stack
                  direction="horizontal"
                  className="justify-content-between sizes p-3"
                >
                  <span>{prop}</span>
                  {isLow && isZero === false ? (
                    <span className="fs-7 text-danger">
                      Zostało tylko kilka sztuk!
                    </span>
                  ) : null}{" "}
                </Stack>
              </button>
            );
          }
        }
      });
      setSizeElements(elements);
    } else return;
  }, [selectedSize]);

  if (component === "Product") return sizesElements;
  else if (component === "Favorites") {
    let sizesBtncomponent;
    switch (selectedSize) {
      case "Wybierz rozmiar":
        sizesBtncomponent = "outline-secondary";
        break;
      case "Wybierz rozmiar!":
        sizesBtncomponent = "outline-danger";
        break;
      default:
        sizesBtncomponent = "outline-dark";
        break;
    }

    return (
      <>
        <Button
          variant={sizesBtncomponent}
          className="rounded-0 text-center p-2 w-50"
          onClick={(e) => handleShowModal(e)}
        >
          <span
            className={`${
              selectedSize !== "Wybierz rozmiar" &&
              selectedSize !== "Wybierz rozmiar!"
                ? "fw-bold"
                : ""
            }`}
          >
            {selectedSize}
          </span>
        </Button>
        <Modal
          fullscreen={"lg-down"}
          show={showModal}
          onHide={handleCloseModal}
          dialogClassName="sizes-modal"
        >
          <Modal.Header closeButton className="p-4">
            <Modal.Title>
              <h6 className=" m-0">Wybierz rozmiar</h6>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-3">
            <Stack>{sizesElements}</Stack>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
