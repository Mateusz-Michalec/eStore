import { createContext } from "react";
import useFetch from "../hooks/useFetch";
import useLocalStorage from "../hooks/useLocalStorage";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [categories] = useFetch("https://fakestoreapi.com/products/categories");
  const [products] = useFetch("https://fakestoreapi.com/products");
  const [favorites, setFavorites] = useLocalStorage("favorites", []);

  function checkIsFavorite(product) {
    if (favorites.some((favorite) => favorite.id === product.id)) return true;
    else return false;
  }

  function toggleFavoriteProduct(product) {
    if (checkIsFavorite(product))
      setFavorites(favorites.filter((favorite) => favorite.id !== product.id));
    else setFavorites((prev) => [...prev, product]);
  }

  return (
    <DataContext.Provider
      value={{
        categories,
        products,
        favorites,
        toggleFavoriteProduct,
        checkIsFavorite,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
