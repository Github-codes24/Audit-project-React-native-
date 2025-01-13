import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {baseApi} from './baseApiSlice';
import {apiEndPoints} from '../../constants/apiConstants';

export const profileApiSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getProfileTermAndConditionApi: builder.query({
      query: (body) => ({
        url: apiEndPoints?.registerApi,
        method: 'GET',
        keepUnusedDataFor: 5,
      }),
    }),

      getuserApi: builder.query({
      query:(id) => ({
        url: `${apiEndPoints?.getUser}/${id}`,
        method: 'Get',
    
      }),

     


    }),




  }),
  overrideExisting: true,
});

export const {
 useGetProfileTermAndConditionApiQuery,
 useGetuserApiQuery
 
} = profileApiSlice;
