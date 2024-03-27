// api/usersAPI.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({  baseUrl: import.meta.env.VITE_API_BASE_URL }),
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (credentials) => ({
        url: '/users/signin',
        method: 'POST',
        body: credentials,
      }),
    }),
    signUp: builder.mutation({
      query: (userData) => ({
        url: '/users/signup',
        method: 'POST',
        body: userData,
      }),
    }),
    editUserInfo: builder.mutation({
      query: (userData) => ({
        url: '/users/edit',
        method: 'PUT',
        body: userData,
      }),
    }),
    getUserInfo: builder.query({
      query: () => '/users/userinfo',
    }),
    deleteUser: builder.mutation({
      query: () => ({
        url: '/users/delete',
        method: 'DELETE',
      }),
    }),
    getUserConversation: builder.query({
      query: (userId) => `/conversations/${userId}`,
    }),
    createUserConversation: builder.mutation({
      query: (data) => ({
        url: '/conversations',
        method: 'POST',
        body: data
      }),
    }),
  }),
});

