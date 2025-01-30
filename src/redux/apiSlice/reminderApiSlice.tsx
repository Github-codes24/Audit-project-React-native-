import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {baseApi} from './baseApiSlice';
import {apiEndPoints} from '../../constants/apiConstants';

export const remainderApiSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
      getAllReminderApi: builder.query({
      query:(userId) => ({
        url: `${apiEndPoints?.getAllRemainderApi}/${userId}`,
        method: 'GET',
      }),
    }),

 setRemainderApi: builder.mutation({
        query:({userId,body}) => ({
           url: `${apiEndPoints?.createRemainderApi}/${userId}`,
          method: 'POST',
          body:body,
          keepUnusedDataFor: 5,}),
      }),



  }),
  overrideExisting: true,
});

export const {
 useGetAllReminderApiQuery,
 useSetRemainderApiMutation,
 
} = remainderApiSlice;
