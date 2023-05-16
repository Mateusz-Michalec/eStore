import React from "react";

export default function Badge({ value }) {
  return (
    <span className="main-bg text-white rounded-circle badge-dimens position-absolute bage-positon d-flex justify-content-center align-items-center">
      <span className="fs-7">{value}</span>
    </span>
  );
}
