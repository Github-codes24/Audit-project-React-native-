import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {baseApi} from './baseApiSlice';
import {apiEndPoints} from '../../constants/apiConstants';

export const CustomerSupportApiSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    contactUsApi: builder.mutation({
      query: (body) => ({
        url: apiEndPoints?.contactUs,
        method: 'POST',
        body:body,
        keepUnusedDataFor: 5,
      }),
    }),
   





  }),
  overrideExisting: true,
});

export const {
useContactUsApiMutation
 
} = CustomerSupportApiSlice;
