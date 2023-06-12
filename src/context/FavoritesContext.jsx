import { createContext, useContext } from "react";
import DataContext from "./dataContext";
import { SearchUtils } from "../utils";
import useLocalStorage from "../hooks/useLocalStorage";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage("favorites", []);
  const { setAlertData } = useContext(DataContext);

  function toggleFavoriteProduct(product) {
    const isFavorite = SearchUtils.checkIsAlreadyAdded(product, favorites);
    if (isFavorite)
      setFavorites((prev) =>
        prev.filter((favorite) => favorite.id !== product.id)
      );
    else
      setFavorites((prev) => [
        ...prev,
        {
          id: product.id,
          title: product.title,
          image: product.image,
          price: product.price,
          available: product.available,
          sizes: product.sizes,
        },
      ]);

    setAlertData({
      show: true,
      text: isFavorite
        ? "Usunięto produkt z ulubionych."
        : "Dodano produkt do ulubionych!",
      location: "ulubione",
    });
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavoriteProduct }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContext;
