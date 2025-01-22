import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {baseApi} from './baseApiSlice';
import {apiEndPoints} from '../../constants/apiConstants';

export const profileApiSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
      get10userApiNotification: builder.query({
      query:(userId) => ({
        url: `${apiEndPoints?.get10UserNotificationsApi}/${userId}`,
        method: 'GET',
      }),
    }),

    getAlluserApiNotification: builder.query({
      query:(userId) => ({
        url: `${apiEndPoints?.getAllNotificationsApi}/${userId}`,
        method: 'GET',
      }),
    }),

 getUserReadNotificationApi: builder.query({
      query:(notificationId) => ({
        url: `${apiEndPoints?.getUserReadNotificationApi}/${notificationId}`,
        method: 'PUT',
      }),
    }),


get10UserUnReadApiSlice: builder.query({
      query:(userId) => ({
        url: `${apiEndPoints?.get10userUnreadNotificationApi}/${userId}`,
        method: 'GET',
      }),
    }),

get10UserReadApiSlice: builder.query({
      query:(userId) => ({
        url: `${apiEndPoints?.get10UserReadNotificationApi}/${userId}`,
        method: 'GET',
      }),
    }),
    
  }),
  overrideExisting: true,
});

export const {
 useGet10userApiNotificationQuery,
 useGetAlluserApiNotificationQuery,
 useGet10UserUnReadApiSliceQuery,
 useGetUserReadNotificationApiQuery,
 useGet10UserReadApiSliceQuery
 
} = profileApiSlice;
