import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {baseApi} from './baseApiSlice';
import {apiEndPoints} from '../../constants/apiConstants';

export const eligibilityApiSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getEligibilityCategory: builder.query({
      query: () => ({
        url: apiEndPoints?.getEligibilityCategory,
        method: 'GET',
        keepUnusedDataFor: 5,
      }),
    }),

    getEligibilityQuestions: builder.query({
      query:(params) => ({
        url: apiEndPoints?.getEligibilityQuestions,
        method: 'GET',
        params:{params},
        keepUnusedDataFor: 5,}),

     


    }),

  

  }),
  overrideExisting: true,
});

export const {
useGetEligibilityQuestionsQuery,
useGetEligibilityCategoryQuery,
} = eligibilityApiSlice;
