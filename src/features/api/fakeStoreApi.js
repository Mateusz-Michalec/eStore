import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductDataManipulation } from "../../utils";

export const fakeStoreApi = createApi({
  reducerPath: "fakeStoreApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com" }),
  endpoints: (builder) => ({
    getCarouselProducts: builder.query({
      query: () => "/products?limit=5",
    }),
    getCategories: builder.query({
      query: () => "/products/categories",
    }),
    getAllProducts: builder.query({
      query: () => "/products",
      transformResponse: (products) =>
        ProductDataManipulation.changeProductsData(products),
    }),
    getProductsByCategory: builder.query({
      query: (categoryId, sortValue) =>
        `/products/category/${categoryId}?sort=${sortValue}`,
    }),
    getProduct: builder.query({
      query: (id) => `/products/${id}`,
      transformResponse: (product) =>
        ProductDataManipulation.changeProductData(product),
    }),
  }),
});

export const {
  useGetCarouselProductsQuery,
  useGetCategoriesQuery,
  useGetAllProductsQuery,
  useGetProductsByCategoryQuery,
  useGetProductQuery,
} = fakeStoreApi;
