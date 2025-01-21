import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {baseApi} from './baseApiSlice';
import {apiEndPoints} from '../../constants/apiConstants';

export const blogApiSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllBlogs: builder.query({
      query:({ category, }) => ({
        url: apiEndPoints?.getAllBlogs,
        method: 'GET',
        params:{
       category
        },
        keepUnusedDataFor: 5,
      }),
    }),

    getblogsById: builder.query({
      query:({id}) => ({
        url: `${apiEndPoints?.getBlogById}/${id}`,
        method: 'GET',
        keepUnusedDataFor: 5,}),
    }),
  }),
  overrideExisting: true,
});

export const {
 useGetAllBlogsQuery,
 useGetblogsByIdQuery
} = blogApiSlice;
