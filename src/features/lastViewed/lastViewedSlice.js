import { getItem, saveItem } from "../../utils/LocalStorage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = getItem("lastViewed", []);

const lastViewedSlice = createSlice({
  name: "lastViewed",
  initialState: initialState,
  reducers: {
    addLastViewed(state, action) {
      const { id } = action.payload;
      const isAdded = state.some((viewedId) => viewedId === id);
      if (isAdded || state.length > 10) return;
      else {
        state.unshift(id);
        saveItem("lastViewed", state);
      }
    },
  },
});

export const { addLastViewed } = lastViewedSlice.actions;

export const selectLastViewed = (state) => state.lastViewed;

export default lastViewedSlice.reducer;
