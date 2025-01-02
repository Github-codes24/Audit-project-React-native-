import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {baseApi} from './baseApiSlice';
import {apiEndPoints} from '../../constants/apiConstants';

export const AuthApiSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    register: builder.mutation({
      query: ({firstName,email,password,lastName,phoneNumber,company}) => ({
        url: apiEndPoints?.registerApi,
        method: 'POST',
        body: {firstName,email,password,lastName,phoneNumber,company},
        keepUnusedDataFor: 5,
      }),
    }),
    loginApi: builder.mutation({
      query:({email,password}) => ({
        url: apiEndPoints?.loginApi,
        method: 'POST',
        body:{email,password},
        // keepUnusedDataFor: 5,

        // invalidatesTags: _ => [
        //   'getPendingPayments',
        //   'getDashboardData',
        //   'getComplaint',
        //   'getRequest',
        // ],
      }),
    }),
    forgotPasswordApi: builder.mutation({
      query: email => ({
        url: apiEndPoints?.forgotPasswordApi,
        method: 'POST',
        body:{email},
        keepUnusedDataFor: 5,
      }),
    }),
    verifyOtp: builder.mutation({
      query: ({email,otp}) => ({
        url: apiEndPoints?.verifyOtp,
        method: 'POST',
       body:{email,otp}
        // keepUnusedDataFor: 5,

        // invalidatesTags: _ => [
        //   'getPendingPayments',
        //   'getDashboardData',
        //   'getComplaint',
        //   'getRequest',
        // ],
      }),

     


    }),

 resetPasswordApi: builder.mutation({
      query: ({email,newPassword,confirmPassword}) => ({
        url: apiEndPoints?.resetPasswordApi,
        method: 'POST',
       body:{email,newPassword,confirmPassword}
        // keepUnusedDataFor: 5,

        // invalidatesTags: _ => [
        //   'getPendingPayments',
        //   'getDashboardData',
        //   'getComplaint',
        //   'getRequest',
        // ],
      }),

     


    }),


  }),
  overrideExisting: true,
});

export const {
 useForgotPasswordApiMutation,
 useLoginApiMutation,
 useRegisterMutation,
 useVerifyOtpMutation,
 useResetPasswordApiMutation
} = AuthApiSlice;
