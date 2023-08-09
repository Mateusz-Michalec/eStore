import { getItem, saveItem } from "../../utils/LocalStorage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = getItem("favorites", []);

const favoritesSlice = createSlice({
  name: "favorties",
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const id = action.payload;
      const productIndex = state.findIndex((favoriteId) => favoriteId === id);
      if (productIndex === -1) state.push(id);
      else state.splice(productIndex, 1);
      saveItem("favorites", state);
    },
  },
});

export const selectFavorites = (state) => state.favorites;
export const checkIsFavorite = (state, id) =>
  state.favorites.some((favoriteId) => favoriteId === id);
export const getFavoritesCount = (state) => state.favorites.length;

export const { toggleFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
