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

 getReminderForOptionApi: builder.query({
  query: () => ({
    url: apiEndPoints?.getReaminderForOptionApi,  
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

   UpdateRemainderApi: builder.mutation({
        query:({id,body}) => ({
           url: `${apiEndPoints?.updateReminder}/${id}`,
          method: 'PUT',
          body:body,
          keepUnusedDataFor: 5,}),
      }),

   deleteRemainderApi: builder.mutation({
        query:({id}) => ({
           url: `${apiEndPoints?.deleteReminder}/${id}`,
          method: 'DELETE',
          keepUnusedDataFor: 5,}),
      }),


  }),
  overrideExisting: true,
});

export const {
 useGetAllReminderApiQuery,
 useSetRemainderApiMutation,
 useUpdateRemainderApiMutation,
 useDeleteRemainderApiMutation,
 useGetReminderForOptionApiQuery,
 
} = remainderApiSlice;
