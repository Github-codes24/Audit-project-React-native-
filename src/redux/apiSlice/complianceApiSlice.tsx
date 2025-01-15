import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {baseApi} from './baseApiSlice';
import {apiEndPoints} from '../../constants/apiConstants';

export const complianceApiSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCompilanceQuestionsCategory: builder.query({
      query: () => ({
        url: apiEndPoints?.getCompilanceQuestionsCategory,
        method: 'GET',
        keepUnusedDataFor: 5,
      }),
    }),

    getcompilanceQuestions: builder.query({
      query:(params) => ({
        url: apiEndPoints?.getcompilanceQuestions,
        method: 'GET',
        params:{params},
        keepUnusedDataFor: 5,}),

     


    }),

    calculateCompilanceScore: builder.mutation({
        query:(body) => ({
          url: apiEndPoints?.calculateCompilanceScore,
          method: 'POST',
          body:{body},
          keepUnusedDataFor: 5,}),
  
       
  
  
      }),




  }),
  overrideExisting: true,
});

export const {
 useCalculateCompilanceScoreMutation,
 useGetcompilanceQuestionsQuery,
 useGetCompilanceQuestionsCategoryQuery,
} = complianceApiSlice;
