import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { DataProvider } from "./context/dataContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { FavoritesProvider } from "./context/FavoritesContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <DataProvider>
    <CartProvider>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </CartProvider>
  </DataProvider>
);
