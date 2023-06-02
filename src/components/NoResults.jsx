import React from "react";

export default function NoResults({ text }) {
  return (
    <div className="text-secondary text-center">
      <i className="bi bi-search text-secondary fs-1"></i>
      <h1 className="h3">{text}</h1>
    </div>
  );
}
