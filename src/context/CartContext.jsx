import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { SearchUtils } from "../utils";
import DataContext from "./dataContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage("cart", []);
  const { setAlertData } = useContext(DataContext);

  function addToCart(product) {
    const current = SearchUtils.checkIsAlreadyAdded(product, cart);

    const maxQuantity =
      product.available || SearchUtils.getAvailableSizesQuantity(product);

    if (current) {
      setCart((prev) =>
        prev.map((item) => {
          if (item.id === current.id && item?.size === current?.size)
            return {
              ...current,
              quantity:
                item.quantity < maxQuantity ? item.quantity + 1 : maxQuantity,
            };
          else return { ...item };
        })
      );
    } else
      setCart((prev) => [
        ...prev,
        {
          id: product.id,
          title: product.title,
          image: product.image,
          quantity: 1,
          size: product.size || null,
          price: product.price,
          available: maxQuantity,
        },
      ]);
    setAlertData({
      show: true,
      text: "Dodano produkt do koszyka!",
      location: "cart",
    });
  }

  function updateCart(product, quantity) {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === product.id && item?.size === product?.size)
          return {
            ...item,
            quantity: quantity,
          };
        else return { ...item };
      })
    );
  }

  function deleteFromCart(product) {
    setCart((prev) =>
      prev.filter(
        (item) => item?.size !== product?.size || item.id !== product.id
      )
    );
    setAlertData({
      show: true,
      text: "Usunięto produkt z koszyka.",
      location: "cart",
    });
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateCart, deleteFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
