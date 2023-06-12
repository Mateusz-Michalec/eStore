import React from "react";

export default function PageHeader({ array, title }) {
  if (array.length > 0)
    return (
      <header className="mb-4">
        <h1 className="h2">{title}</h1>
        <p className="text-secondary fs-7">
          {array.length} produkt
          {array.length > 1 && array.length <= 4
            ? "y"
            : array.length > 4
            ? "ów"
            : ""}
        </p>
      </header>
    );
  else return null;
}
