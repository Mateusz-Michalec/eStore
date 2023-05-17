import { createContext } from "react";
import useFetch from "../hooks/useFetch";
import useLocalStorage from "../hooks/useLocalStorage";
import { getProductSizes, usdToPLN } from "../utils";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [categories] = useFetch("https://fakestoreapi.com/products/categories");
  const [products] = useFetch(
    "https://fakestoreapi.com/products",
    function changeData(results) {
      return results.map((item) => ({
        ...item,
        price: usdToPLN(item.price),
        sizes: getProductSizes(),
      }));
    }
  );
  const [favorites, setFavorites] = useLocalStorage("favorites", []);
  const [cart, setCart] = useLocalStorage("cart", []);

  function checkIsAlreadyAdded(product, array) {
    if (array.some((item) => item.id === product.id)) return true;
    else return false;
  }

  function toggleFavoriteProduct(product) {
    if (checkIsAlreadyAdded(product, favorites))
      setFavorites(favorites.filter((favorite) => favorite.id !== product.id));
    else
      setFavorites((prev) => [
        ...prev,
        {
          id: product.id,
          image: product.image,
          title: product.title,
          price: product.price,
          sizes: product.sizes,
        },
      ]);
  }

  function addToCart(product) {
    if (!checkIsAlreadyAdded(product, cart)) setCart(product);
  }

  return (
    <DataContext.Provider
      value={{
        categories,
        products,
        favorites,
        cart,
        toggleFavoriteProduct,
        checkIsAlreadyAdded,
        addToCart,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
