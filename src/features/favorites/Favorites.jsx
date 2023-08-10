import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import FavoriteProduct from "./FavoriteProduct";
import PageHeader from "../../components/common/PageHeader/PageHeader";
import Empty from "../../components/common/Empty";
import FavoriteProductPlaceholder from "./FavoriteProductPlaceholder/FavoriteProductPlaceholder";
import { useSelector } from "react-redux";
import { getFavoritesCount, selectFavorites } from "./favoritesSlice";
import { useGetAllProductsQuery } from "../api/fakeStoreApi";

export default function Favorites() {
  const favorites = useSelector(selectFavorites);
  const favoritesLength = useSelector(getFavoritesCount);

  const { data: allProducts, isLoading, isSuccess } = useGetAllProductsQuery();

  const [favoritesItems, setFavoritesItems] = useState([]);

  const filterAllProducts = () => {
    return favorites.map((favoriteId) =>
      allProducts?.find((product) => product.id === favoriteId)
    );
  };

  useEffect(() => {
    if (isSuccess) setFavoritesItems(filterAllProducts);
  }, [isLoading, favorites]);

  return (
    <>
      <Empty arrayLength={favoritesLength} title="Brak ulubionych" />
      <PageHeader title={"Ulubione"} arrayLength={favoritesLength} />
      <section>
        <Row className="gy-5 gx-4">
          {isLoading
            ? favorites.map((favoriteId) => (
                <FavoriteProductPlaceholder key={favoriteId} />
              ))
            : favoritesItems.map((product) => (
                <FavoriteProduct
                  key={product.id}
                  product={product}
                  component="Favorites"
                />
              ))}
        </Row>
      </section>
    </>
  );
}
