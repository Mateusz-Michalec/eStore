import { createContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import useLocalStorage from "../hooks/useLocalStorage";
import { getProductSizes, usdToPLN } from "../utils";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [categories] = useFetch("https://fakestoreapi.com/products/categories");

  const [favorites, setFavorites] = useLocalStorage("favorites", []);
  const [cart, setCart] = useLocalStorage("cart", []);

  const [sizes, setSizes] = useState(getProductSizes);

  console.log(sizes);

  function checkIsAlreadyAdded(product, array, favoriteCheck) {
    if (favoriteCheck) return array.find((item) => item.id === product.id);
    else
      return array.find(
        (item) => item.id === product.id && item.size === product.size
      );
  }

  function getSingleProduct(id) {
    return useFetch(
      `https://fakestoreapi.com/products/${id}`,
      function changeData(product) {
        return { ...product, price: usdToPLN(product.price), sizes: sizes[id] };
      }
    );
  }

  function toggleFavoriteProduct(product) {
    if (checkIsAlreadyAdded(product, favorites, true))
      setFavorites(favorites.filter((favorite) => favorite.id !== product.id));
    else setFavorites((prev) => [...prev, { id: product.id }]);
  }

  function addToCart(product, size, quantity) {
    const current = checkIsAlreadyAdded(product, cart);
    if (!current)
      setCart((prev) => [
        ...prev,
        (({ id, image, title, price }) => ({
          id,
          image,
          title,
          price,
          size: size,
          quantity: 1,
        }))(product),
      ]);
    else {
      setCart((prev) =>
        prev.map((item) => {
          if (item.id === current.id && item.size === current.size)
            return {
              ...current,
              quantity: quantity || item.quantity + 1,
            };
          else return { ...item };
        })
      );
    }
  }

  function deleteFromCart(product, isSize) {
    if (isSize) setCart(cart.filter((item) => item.size !== product.size));
    else setCart(cart.filter((item) => item.id !== product.id));
  }

  return (
    <DataContext.Provider
      value={{
        categories,
        favorites,
        cart,
        toggleFavoriteProduct,
        checkIsAlreadyAdded,
        addToCart,
        deleteFromCart,
        getSingleProduct,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
