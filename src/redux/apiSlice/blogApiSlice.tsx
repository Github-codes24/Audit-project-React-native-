import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {baseApi} from './baseApiSlice';
import {apiEndPoints} from '../../constants/apiConstants';

export const blogApiSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllBlogs: builder.query({
      query:({ category, page, limit }) => ({
        url: apiEndPoints?.getAllBlogs,
        method: 'GET',
       params: {
        category,
        page,
        limit
      },
        keepUnusedDataFor: 5,
      }),
    }),

    getblogsById: builder.query({
      query:(params) => ({
        url: apiEndPoints?.getBlogById,
        method: 'GET',
        params:params,
        keepUnusedDataFor: 5,}),

     


    }),


  }),
  overrideExisting: true,
});

export const {
 useGetAllBlogsQuery,
 useGetblogsByIdQuery
} = blogApiSlice;
