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

 get: builder.query({
      query:(notificationId) => ({
        url: `${apiEndPoints?.getUserReadNotificationApi}/${notificationId}`,
        method: 'GET',
      }),
    }),


    
  }),
  overrideExisting: true,
});

export const {
 useGet10userApiNotificationQuery,
 useGetAlluserApiNotificationQuery,
 
} = profileApiSlice;
