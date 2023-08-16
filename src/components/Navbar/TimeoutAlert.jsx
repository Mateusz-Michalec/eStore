import React, { useEffect } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { hideAlert, selectAlertData } from "../../features/alert/alertSlice";

export default function TimeoutAlert() {
  const dispatch = useDispatch();
  const alertData = useSelector(selectAlertData);

  useEffect(() => {
    let hideTimeout;
    if (alertData.show)
      hideTimeout = setTimeout(() => dispatch(hideAlert()), 2000);
    return () => clearTimeout(hideTimeout);
  }, [alertData.show]);

  return (
    <Link to={`/${alertData.path}`}>
      <Alert
        show={alertData.show}
        variant="light"
        className="position-absolute top-100 end-0 mt-4 text-white main-bg px-4 pb-0 me-4 me-lg-5"
      >
        <p>{alertData.text}</p>
      </Alert>
    </Link>
  );
}
