import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {baseApi} from './baseApiSlice';
import {apiEndPoints} from '../../constants/apiConstants';

export const AuthApiSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    register: builder.mutation({
      query: (body) => ({
        url: apiEndPoints?.registerApi,
        method: 'POST',
        body: body,
        keepUnusedDataFor: 5,
      }),
    }),

    resendOtpForRegistrationPasswordApi: builder.mutation({
      query: email => ({
        url: apiEndPoints?.resendCodeForRegistration,
        method: 'POST',
        body:email,
        keepUnusedDataFor: 5,
      }),
    }),



    loginApi: builder.mutation({
      query:({email,password,fcmToken}) => ({
        url: apiEndPoints?.loginApi,
        method: 'POST',
        body:{email,password,fcmToken},
        // keepUnusedDataFor: 5,

      }),
    }),
    
    forgotPasswordApi: builder.mutation({
      query: email => ({
        url: apiEndPoints?.forgotPasswordApi,
        method: 'POST',
        body:email,
        keepUnusedDataFor: 5,
      }),
    }),

 resendOtpForgotPasswordApi: builder.mutation({
      query: email => ({
        url: apiEndPoints?.resendCodeforForgotPassword,
        method: 'POST',
        body:email,
        keepUnusedDataFor: 5,
      }),
    }),


    verifyOtpForgotPassword: builder.mutation({
      query: ({email,otp}) => ({
        url: apiEndPoints?.verifyOtp,
        method: 'POST',
       body:{email,otp}
        // keepUnusedDataFor: 5,

        
      }),
    }),

    verifyOtpForRegistration: builder.mutation({
      query: ({email,otp,fcmToken}) => ({
        url: apiEndPoints?.OtpForRegisteration,
        method: 'POST',
       body:{email,otp,fcmToken}
        // keepUnusedDataFor: 5, 
      }),
    }),





 resetPasswordApi: builder.mutation({
      query: ({email,newPassword,confirmPassword}) => ({
        url: apiEndPoints?.resetPasswordApi,
        method: 'POST',
       body:{email,newPassword,confirmPassword}
        // keepUnusedDataFor: 5,   
      }),
    }),
  

    deleteAccountApi: builder.mutation({
      query:(id) => ({
        url: `${apiEndPoints?.deleteAccount}/${id}`,
        method: 'DELETE',
    
      }),

     


    }),

  }),
  overrideExisting: true,
});

export const {
 useForgotPasswordApiMutation,
 useLoginApiMutation,
 useRegisterMutation,
 useVerifyOtpForgotPasswordMutation,
 useResetPasswordApiMutation,
 useVerifyOtpForRegistrationMutation,
 useDeleteAccountApiMutation,
 useResendOtpForRegistrationPasswordApiMutation,
 useResendOtpForgotPasswordApiMutation,
 
} = AuthApiSlice;
