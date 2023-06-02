import { createContext, useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import useLocalStorage from "../hooks/useLocalStorage";
import { getProductSizes, usdToPLN, getPromises } from "../utils";
import usePromiseAll from "../hooks/usePromiseAll";
import useTimeoutAlert from "../hooks/useTimeoutAlert";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [categories] = useFetch("https://fakestoreapi.com/products/categories");

  const [allProducts, setAllProducts] = useFetch(
    "https://fakestoreapi.com/products"
  );

  const [favorites, setFavorites] = useLocalStorage("favorites", []);
  const [cart, setCart] = useLocalStorage("cart", []);
  const [historyProducts, setHistoryProducts] = useLocalStorage(
    "productsHistory",
    []
  );

  const [sizes, setSizes] = useState(getProductSizes);

  const [alertData, setAlertData] = useTimeoutAlert();

  function addProductToHistory(product) {
    useEffect(() => {
      if (product)
        if (historyProducts.includes(product.id) === false) {
          if (historyProducts.length > 15)
            setHistoryProducts((prev) => prev.toSpliced(0, 1, product.id));
          else setHistoryProducts((prev) => [product.id, ...prev]);
        }
    }, [product]);
  }

  function checkIsAlreadyAdded(id, array, selectedSize) {
    if (Array.isArray(array)) return array.includes(id);
    else
      return array.find((item) => item.id === id && item.size === selectedSize);
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
      changeProductData,
      id
    );
  }

  function getMultipleProducts(array) {
    return usePromiseAll(getPromises(array), changeProductsData);
  }

  function toggleFavoriteProduct(id) {
    const isFavorite = checkIsAlreadyAdded(id, favorites);
    if (isFavorite)
      setFavorites(favorites.filter((favoriteId) => favoriteId !== id));
    else setFavorites((prev) => [...prev, id]);

    setAlertData({
      show: true,
      text: isFavorite
        ? "Usunięto produkt z ulubionych."
        : "Dodano produkt do ulubionych!",
      location: "ulubione",
    });
  }

  function addToCart(id, size, price) {
    const current = checkIsAlreadyAdded(id, cart, size);
    if (current)
      setCart((prev) =>
        prev.map((item) => {
          if (item.id === current.id && item.size === current.size)
            return {
              ...current,
              quantity: item.quantity + 1,
            };
          else return { ...item };
        })
      );
    else
      setCart((prev) => [
        ...prev,
        { id: id, size: size, quantity: 1, price: price },
      ]);
    setAlertData({
      show: true,
      text: "Dodano produkt do koszyka!",
      location: "koszyk",
    });
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
    if (isSize)
      setCart(
        cart.filter(
          (item) => item.size !== product.size || item.id !== product.id
        )
      );
    else setCart(cart.filter((item) => item.id !== product.id));
    setAlertData({
      show: true,
      text: "Usunięto produkt z koszyka.",
      location: "koszyk",
    });
  }

  return (
    <DataContext.Provider
      value={{
        categories,
        allProducts,
        favorites,
        toggleFavoriteProduct,
        checkIsAlreadyAdded,
        cart,
        addToCart,
        deleteFromCart,
        updateCart,
        getSingleProduct,
        getMultipleProducts,
        alertData,
        setAlertData,
        historyProducts,
        addProductToHistory,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
