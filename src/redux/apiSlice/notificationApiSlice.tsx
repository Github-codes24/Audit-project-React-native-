
import { baseApi } from './baseApiSlice';
import { apiEndPoints } from '../../constants/apiConstants';

export const profileApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    get10userApiNotification: builder.query({
      query: (userId) => ({
        url: `${apiEndPoints?.get10UserNotificationsApi}/${userId}`,
        method: 'GET',
      }),
      providesTags: ['Notifications'],
    }),

    getAlluserApiNotification: builder.query({
      query: (userId) => ({
        url: `${apiEndPoints?.getAllNotificationsApi}/${userId}`,
        method: 'GET',
      }),
      providesTags: ['Notifications'],
    }),

    get10UserUnReadApiSlice: builder.query({
      query: (userId) => ({
        url: `${apiEndPoints?.get10userUnreadNotificationApi}/${userId}`,
        method: 'GET',
      }),
      providesTags: ['UnreadNotifications'],
    }),

    get10UserReadApiSlice: builder.query({
      query: (userId) => ({
        url: `${apiEndPoints?.get10UserReadNotificationApi}/${userId}`,
        method: 'GET',
      }),
      providesTags: ['ReadNotifications'],
    }),

    markNotificationAsRead: builder.mutation({
      query: (notificationId) => ({
        url: `${apiEndPoints?.markNotificationAsRead}/${notificationId}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Notifications', 'UnreadNotifications', 'ReadNotifications'],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGet10userApiNotificationQuery,
  useGetAlluserApiNotificationQuery,
  useGet10UserUnReadApiSliceQuery,
  useMarkNotificationAsReadMutation,
  useGet10UserReadApiSliceQuery,
} = profileApiSlice;
