import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  text: "",
  path: "",
  show: false,
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: {
      reducer(state, action) {
        return action.payload;
      },
      prepare(text, path) {
        return {
          payload: {
            text: text,
            path: path,
            show: true,
          },
        };
      },
    },
    hideAlert(state) {
      return {
        ...state,
        show: false,
      };
    },
  },
});

export const selectAlertData = (state) => state.alert;

export const { showAlert, hideAlert } = alertSlice.actions;

export default alertSlice.reducer;
