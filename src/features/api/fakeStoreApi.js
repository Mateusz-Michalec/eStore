import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const fakeStoreApi = createApi({
  reducerPath: "fakeStoreApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com" }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/products/categories",
    }),
    getAllProducts: builder.query({
      query: () => "/products",
    }),
    getProductsByCategory: builder.query({
      query: ({ categoryId, sortValue }) =>
        `/products/category/${categoryId}?sort=${sortValue}`,
    }),
    getProduct: builder.query({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetAllProductsQuery,
  useGetProductsByCategoryQuery,
  useGetProductQuery,
} = fakeStoreApi;
