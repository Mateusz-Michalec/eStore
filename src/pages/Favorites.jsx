import React, { useContext } from "react";
import { Container, Row } from "react-bootstrap";
import DataContext from "../context/dataContext";
import FavoriteProduct from "../components/FavoriteProduct";

export default function Favorites() {
  const { favorites } = useContext(DataContext);

  return (
    <main className=" px-3 px-lg-5 py-4">
      <h1 className="h2">Ulubione</h1>
      <p className="text-secondary fs-7">
        {favorites.length} Produkt{favorites.length > 1 ? "y" : ""}
      </p>
      <section>
        <Row className="gy-5 gx-4">
          {favorites.map((favorite) => (
            <FavoriteProduct
              key={favorite.id}
              product={favorite}
              component="Favorites"
            />
          ))}
        </Row>
      </section>
    </main>
  );
}
