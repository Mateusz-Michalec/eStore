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
      if (!size) {
        cartProductIndex = state.findIndex((cartItem) => cartItem.id === id);
        maxQuantity = available;
        product = { id };
      } else {
        cartProductIndex = state.findIndex(
          (cartItem) => cartItem.id === id && cartItem.size === size
        );
        maxQuantity = sizeQuantity;
        product = { id, size };
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
  },
});

export const selectCartItems = (state) => state.cart;
export const getCartItemsCount = (state) => state.cart.length;

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
