import React, { useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import "./Sizes.scss";

export default function Sizes({
  sizes,
  selectedSize,
  handleSizeSelect,
  component,
}) {
  const [showModal, setShowModal] = useState(false);
  const [isLowSizes] = useState(() => {
    let isLowSize = false;
    sizes.map((size) => {
      for (const prop in size) {
        const quantity = size[prop];
        const isLow = quantity <= 3;
        const isZero = quantity === 0;
        if (isLow && !isZero) isLowSize = true;
      }
    });
    return isLowSize;
  });

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const renderSizes = () => {
    const sizesElements = [];

    sizes.map((size) => {
      for (const prop in size) {
        const quantity = size[prop];
        const isZero = quantity === 0;
        const isLow = quantity <= 3;

        if (component === "Product")
          sizesElements.push(
            <Button
              variant="outline-dark"
              key={prop}
              id={prop}
              className={`${isZero ? "disabled" : ""} ${
                prop === selectedSize ? "selected" : ""
              } py-2 min-width-80px rounded-0`}
              onClick={(e) => handleSizeSelect(e)}
            >
              <Stack direction="horizontal" className="justify-content-center">
                <Stack direction="horizontal">
                  {isLow && !isZero ? (
                    <i className="bi bi-circle-fill text-danger fs-8 me-1 mt-1"></i>
                  ) : null}{" "}
                  <span>{prop}</span>
                </Stack>
              </Stack>
            </Button>
          );
        else if (component === "Favorites")
          sizesElements.push(
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
                {isLow ? (
                  <span className="fs-7 text-danger">
                    Zostało tylko kilka sztuk!
                  </span>
                ) : null}{" "}
              </Stack>
            </button>
          );
      }
    });
    return sizesElements;
  };

  return (
    <>
      {component === "Product" ? (
        <Stack direction="horizontal" className="mb-2 justify-content-between">
          <div>
            {selectedSize !== "Wybierz rozmiar" ? (
              <span>Rozmiary</span>
            ) : (
              <span className="text-danger">Wybierz rozmiar</span>
            )}
          </div>
          {isLowSizes ? (
            <Stack direction="horizontal" className="fs-7">
              <i className="bi bi-circle-fill text-danger me-1 fs-8" />
              <span>Zostało tylko kilka sztuk!</span>
            </Stack>
          ) : null}
        </Stack>
      ) : null}
      <Stack direction="horizontal" className="flex-wrap" gap={3}>
        {component === "Product" ? (
          renderSizes()
        ) : (
          <>
            <Button
              variant={
                selectedSize === "Wybierz rozmiar"
                  ? "outline-danger"
                  : selectedSize
                  ? "outline-dark"
                  : "outline-secondary"
              }
              className="rounded-0 text-center p-2 px-3"
              onClick={(e) => handleShowModal(e)}
            >
              <span className={`${selectedSize ? "fw-bold" : ""}`}>
                {!selectedSize ? "Wybierz rozmiar" : selectedSize}
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
                  <h6 className="m-0">Wybierz rozmiar</h6>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="p-3">
                <Stack>{renderSizes()}</Stack>
              </Modal.Body>
            </Modal>
          </>
        )}
      </Stack>
    </>
  );
}
