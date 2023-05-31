import { createContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import useLocalStorage from "../hooks/useLocalStorage";
import { getProductSizes, usdToPLN } from "../utils";
import usePromiseAll from "../hooks/usePromiseAll";
import useTimeoutAlert from "../hooks/useTimeoutAlert";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [categories] = useFetch("https://fakestoreapi.com/products/categories");

  const [favorites, setFavorites] = useLocalStorage("favorites", []);
  const [cart, setCart] = useLocalStorage("cart", []);

  const [sizes, setSizes] = useState(getProductSizes);

  const [alertData, setAlertData] = useTimeoutAlert();

  function checkIsAlreadyAdded(id, array, selectedSize) {
    if (typeof array === "object")
      return array.find((item) => item.id === id && item.size === selectedSize);
    else return array.includes(product.id);
  }

  function getPromises(array) {
    const promises = [];
    const addedIds = [];
    array.map((item) => {
      if (typeof item === "object") {
        if (addedIds.some((id) => id === item.id) === false) {
          promises.push(fetch(`https://fakestoreapi.com/products/${item.id}`));
          addedIds.push(item.id);
        }
      } else {
        if (addedIds.some((id) => id === item) === false) {
          promises.push(fetch(`https://fakestoreapi.com/products/${item}`));
          addedIds.push(item);
        }
      }
    });
    return promises;
  }

  function changeProductData(product) {
    return {
      ...product,
      price: usdToPLN(product.price),
      sizes:
        product.category === "men's clothing" ||
        product.category === "women's clothing"
          ? sizes[product.id]
          : null,
      available:
        product.category !== "men's clothing" &&
        product.category !== "women's clothing"
          ? Math.floor(Math.random() * 20)
          : null,
    };
  }

  function changeProductsData(products) {
    return products.map((product) => changeProductData(product));
  }

  function getSingleProduct(id) {
    return useFetch(
      `https://fakestoreapi.com/products/${id}`,
      changeProductData
    );
  }

  function getMultipleProducts(array) {
    return usePromiseAll(getPromises(array), changeProductsData);
  }

  function toggleFavoriteProduct(product) {
    if (checkIsAlreadyAdded(product, favorites))
      setFavorites(favorites.filter((favoriteId) => favoriteId !== product.id));
    else setFavorites((prev) => [...prev, product.id]);
  }

  function addToCart(id, size, price, quantity = 1) {
    const current = checkIsAlreadyAdded(id, cart, size);
    if (current)
      setCart((prev) =>
        prev.map((item) => {
          if (item.id === current.id && item.size === current.size)
            return {
              ...current,
              quantity: quantity > 1 ? quantity : item.quantity + 1,
            };
          else return { ...item };
        })
      );
    else
      setCart((prev) => [
        ...prev,
        { id: id, size: size, quantity: quantity, price: price },
      ]);
  }

  function updateCart(id, size, quantity) {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id && item.size === size)
          return {
            ...item,
            quantity: quantity,
          };
        else return { ...item };
      })
    );
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
        updateCart,
        getSingleProduct,
        getMultipleProducts,
        alertData,
        setAlertData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
