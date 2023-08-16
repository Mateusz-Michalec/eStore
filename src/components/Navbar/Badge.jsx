import React from "react";

export default function Badge({ value }) {
  if (value > 0)
    return (
      <span
        style={{ top: "18px", right: "0px" }}
        className="main-bg text-white rounded-circle badge-dimens position-absolute d-flex justify-content-center align-items-center"
      >
        <span className="fs-7">{value > 9 ? "9+" : value}</span>
      </span>
    );
  else return null;
}
