import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import LastViewed from "../../features/lastViewed/LastViewed";

export default function Empty({ arrayLength, title }) {
  const navigate = useNavigate();

  if (arrayLength === 0)
    return (
      <>
        <header>
          <h1 className="h2 text-secondary">{title}</h1>
          <Button
            variant="outline-secondary"
            onClick={() => navigate(-1)}
            className="mt-2 px-3 py-2"
          >
            <i className="bi bi-arrow-left me-1 back-icon" /> Powrót do
            poprzedniej strony
          </Button>
        </header>
        <LastViewed />
      </>
    );
  else return null;
}
