import React, { useEffect, useState, useRef } from "react";
import { Button, Container, Stack } from "react-bootstrap";

export default function Sizes({
  sizes,
  setIsLowSizes,
  handleSizeSelect,
  selectedSize,
  type,
}) {
  const [sizesElements, setSizeElements] = useState();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dialogRef = useRef();

  function handleDialog() {
    if (isDialogOpen) dialogRef.current.close();
    else dialogRef.current.show();
    setIsDialogOpen(!isDialogOpen);
  }

  useEffect(() => {
    const elements = [];

    if (sizes) {
      sizes.map((size) => {
        for (const prop in size) {
          const quantity = size[prop];
          const isLow = quantity <= 3 && quantity > 0;
          if (isLow && setIsLowSizes) setIsLowSizes();
          const isZero = quantity === 0;
          if (type === "Product") {
            elements.push(
              <button
                key={prop}
                id={prop}
                className={`${isZero ? "disabled" : ""} ${
                  prop === selectedSize ? "selected" : ""
                } py-2 border min-80`}
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
              </button>
            );
          } else if (type === "Favorites") {
            elements.push(
              <button
                key={prop}
                id={prop}
                className={`${isZero ? "disabled" : ""} 
                 py-3`}
                onClick={(e) => handleSizeSelect(e)}
              >
                <Stack
                  direction="horizontal"
                  className="justify-content-between"
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

  if (type === "Product") return sizesElements;
  else if (type === "Favorites") {
    return (
      <div className="sizes-dialog-container">
        <Button
          variant="outline-secondary"
          className="rounded-0 w-100 d-flex justify-content-between"
          onClick={() => handleDialog()}
        >
          <span>Wybierz rozmiar </span>
          <i className="bi bi-chevron-down dropdown-arrow"></i>
        </Button>
        {isDialogOpen ? (
          <div className="overlay" onClick={() => handleDialog()}></div>
        ) : null}
        <dialog
          ref={dialogRef}
          className="sizes-dialog mt-5 border border-1 bg-white shadow-sm p-4 w-100"
        >
          <button
            className="position-absolute bottom-100 mb-2 end-0 "
            onClick={() => handleDialog()}
          >
            <i className="bi bi-x-circle-fill fs-4 text-white"></i>
          </button>
          <h6>Wybierz rozmiar</h6>
          <Stack>{sizesElements}</Stack>
        </dialog>
      </div>
    );
  }
}
