import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {baseApi} from './baseApiSlice';
import {apiEndPoints} from '../../constants/apiConstants';

export const importantLinkApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    importtantLinkApiSlice:builder.query({
      query: () => ({
        url: apiEndPoints?.importantLink,
        method: 'GET',
        keepUnusedDataFor: 5,
      }),
    }),

  }),
  overrideExisting: true,
});

export const {

  useImporttantLinkApiSliceQuery,
} = importantLinkApi;
