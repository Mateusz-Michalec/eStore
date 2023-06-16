import { createContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import { ProductSizes } from "../utils";
import useTimeoutAlert from "../hooks/useTimeoutAlert";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [categories] = useFetch("https://fakestoreapi.com/products/categories");
  const [allProducts] = useFetch("https://fakestoreapi.com/products");

  const [sizes] = useState(ProductSizes.getProductSizes);

  const [alertData, setAlertData] = useTimeoutAlert();

  return (
    <DataContext.Provider
      value={{
        categories,
        sizes,
        allProducts,
        alertData,
        setAlertData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
