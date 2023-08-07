import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import sizesSlice from "../features/sizesSlice";
import { fakeStoreApi } from "../features/api/fakeStoreApi";
import favoritesSlice from "../features/favorites/favoritesSlice";
import cartSlice from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    sizes: sizesSlice,
    favorites: favoritesSlice,
    cart: cartSlice,
    [fakeStoreApi.reducerPath]: fakeStoreApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fakeStoreApi.middleware),
});
