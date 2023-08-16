import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const fakeStoreApi = createApi({
  reducerPath: "fakeStoreApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com" }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/products/categories",
      retry: 3,
    }),
    getAllProducts: builder.query({
      query: () => "/products",
      retry: 3,
    }),
    getProductsByCategory: builder.query({
      query: ({ categoryId, sortValue }) =>
        `/products/category/${categoryId}?sort=${sortValue}`,
      retry: 3,
    }),
    getProduct: builder.query({
      query: (id) => `/products/${id}`,
      retry: 3,
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetAllProductsQuery,
  useGetProductsByCategoryQuery,
  useGetProductQuery,
} = fakeStoreApi;
