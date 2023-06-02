import React, { useContext, useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import DataContext from "../context/dataContext";
import FavoriteProduct from "../components/FavoriteProduct";
import FavoriteProductPlaceholder from "../components/FavoriteProductPlaceholder";

export default function Favorites() {
  const { favorites, getMultipleProducts } = useContext(DataContext);
  const [favoriteProducts, setFavoriteProducts] =
    getMultipleProducts(favorites);

  useEffect(() => {
    setFavoriteProducts(
      favoriteProducts?.filter((product, i) => product.id === favorites[i])
    );
  }, [favorites]);

  return (
    <main className="px-4 px-lg-5 py-5">
      <header className="mb-4">
        <h1 className="h2">Ulubione</h1>
        <p className="text-secondary fs-7">
          {favorites.length} Produkt{favorites.length > 1 ? "y" : ""}
        </p>
      </header>
      <section>
        <Row className="gy-5 gx-4">
          {favoriteProducts
            ? favoriteProducts.map((product) => (
                <FavoriteProduct
                  key={product.id}
                  product={product}
                  component="Favorites"
                />
              ))
            : favorites.map((id) => <FavoriteProductPlaceholder key={id} />)}
        </Row>
      </section>
    </main>
  );
}
