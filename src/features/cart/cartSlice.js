import { LocalStorage } from "../../utils";
import { createSlice } from "@reduxjs/toolkit";

const initialState = LocalStorage.getItem("cart", []);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { id, size, sizeQuantity, available } = action.payload;
      let cartProductIndex;
      let maxQuantity;
      let product;

      if (size) {
        cartProductIndex = state.findIndex(
          (cartItem) => cartItem.id === id && cartItem.size === size
        );
        maxQuantity = sizeQuantity;
        product = { id, size };
      } else {
        cartProductIndex = state.findIndex((cartItem) => cartItem.id === id);
        maxQuantity = available;
        product = { id };
      }

      if (cartProductIndex === -1) {
        state.push({ ...product, quantity: 1 });
      } else {
        const productInCart = state[cartProductIndex];
        let newQuantity = productInCart.quantity + 1;
        if (newQuantity > maxQuantity) newQuantity = maxQuantity;
        const updatedProductInCart = {
          ...productInCart,
          quantity: newQuantity,
        };
        state[cartProductIndex] = updatedProductInCart;
      }
      LocalStorage.saveItem("cart", state);
    },
    updateQuantity(state, action) {
      const { id, size, quantity } = action.payload;
      const newState = state.map((cartItem) => {
        if (cartItem.id === id && cartItem?.size === size)
          return { ...cartItem, quantity: quantity };
        else return cartItem;
      });
      LocalStorage.saveItem("cart", newState);
      return newState;
    },
    deleteFromCart(state, action) {
      const { id, size } = action.payload;
      const newState = state.filter(
        (cartItem) => cartItem.id !== id || cartItem?.size !== size
      );
      LocalStorage.saveItem("cart", newState);
      return newState;
    },
  },
});

export const selectCartItems = (state) => state.cart;
export const getCartItemsCount = (state) => state.cart.length;

export const { addToCart, updateQuantity, deleteFromCart } = cartSlice.actions;

export default cartSlice.reducer;
