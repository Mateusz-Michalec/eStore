import React from "react";
import { Row } from "react-bootstrap";
import FavoriteProduct from "./FavoriteProduct";
import PageHeader from "../../components/common/PageHeader";
import Empty from "../../components/common/Empty";
import { useSelector } from "react-redux";
import { selectFavorites } from "./favoritesSlice";

export default function Favorites() {
  const favorites = useSelector(selectFavorites);

  return (
    <main className="px-4 px-lg-5 py-5 mb-5">
      <Empty array={favorites} title="Brak ulubionych" />
      <PageHeader title={"Ulubione"} array={favorites} />
      <section>
        <Row className="gy-5 gx-4">
          {favorites.map((product) => (
            <FavoriteProduct
              key={product.id}
              product={product}
              component="Favorites"
            />
          ))}
        </Row>
      </section>
    </main>
  );
}
