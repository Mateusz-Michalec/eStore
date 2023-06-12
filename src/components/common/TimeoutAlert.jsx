import React, { useContext } from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import DataContext from "../../context/dataContext";

export default function TimeoutAlert() {
  const { alertData } = useContext(DataContext);

  return (
    <Link to={`/${alertData.location}`} className="no-effect">
      <Alert
        show={alertData.show}
        variant="light"
        className="position-absolute top-100 mt-4 end-0 text-white main-bg px-4 pb-0 me-4 me-lg-5"
      >
        <p>{alertData.text}</p>
      </Alert>
    </Link>
  );
}
