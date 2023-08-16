import React from "react";
import "./PageHeader.scss";

export default function PageHeader({ arrayLength, title }) {
  if (arrayLength > 0)
    return (
      <header className="mb-4 page-header">
        <h1 className="h2 page-header__title">{title}</h1>
        <p className="text-secondary fs-7">
          {arrayLength} produkt
          {arrayLength > 1 && arrayLength <= 4
            ? "y"
            : arrayLength > 4
            ? "ów"
            : ""}
        </p>
      </header>
    );
  else return null;
}
