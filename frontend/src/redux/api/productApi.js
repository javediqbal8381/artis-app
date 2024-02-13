// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  endpoints: (builder) => ({
    getHomeProducts: builder.query({
      query: () => `/products/top-ratings`,
    }),
    getProductDetails: builder.query({
      query: (productId) => `/products/product-details/${productId}`,
    }),
    getAllProducts: builder.query({
      query: () => `/products`,
    }),
    getCaratorizedProducts: builder.query({
      query: (catagory) => `/products/category/${catagory}`,
    }),
    getProductsDetailList: builder.mutation({
      query: ({productsIds }) => ({
        url: `products/detail-list/byIds`,
        method: 'GET',
        body: productsIds,
      }),
    }),
  }),
})
