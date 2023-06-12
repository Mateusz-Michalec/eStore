import React, { useContext } from "react";
import { Row } from "react-bootstrap";
import FavoriteProduct from "../Product/FavoriteProduct";
import PageHeader from "../common/PageHeader";
import Empty from "../common/Empty";
import FavoritesContext from "../../context/FavoritesContext";

export default function Favorites() {
  const { favorites } = useContext(FavoritesContext);

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
