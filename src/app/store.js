import sizesSlice from "../features/sizes/sizesSlice";
import favoritesSlice from "../features/favorites/favoritesSlice";
import cartSlice from "../features/cart/cartSlice";
import lastViewedSlice from "../features/lastViewed/lastViewedSlice";
import { fakeStoreApi } from "../features/api/fakeStoreApi";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import alertSlice from "../features/alert/alertSlice";

export const store = configureStore({
  reducer: {
    sizes: sizesSlice,
    favorites: favoritesSlice,
    cart: cartSlice,
    lastViewed: lastViewedSlice,
    alert: alertSlice,
    fakeStoreApi: fakeStoreApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fakeStoreApi.middleware),
});
