import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {baseApi} from './baseApiSlice';
import {apiEndPoints} from '../../constants/apiConstants';

export const profileApiSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getProfileTermAndConditionApi: builder.query({
      query: () => ({
        url: apiEndPoints?.getTermAndDondition,
        method: 'GET',
        keepUnusedDataFor: 5,
      }),
    }),
    getPrivacyPolicy: builder.query({
      query: () => ({
        url: apiEndPoints?.getPrivacyPolicy,
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
 useGetPrivacyPolicyQuery,
 useGetuserApiQuery
 
} = profileApiSlice;
