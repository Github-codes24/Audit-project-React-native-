import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import {baseUrl} from '../../constants/apiConstants';


import Toast from 'react-native-toast-message';
import {Alert} from 'react-native';
// import {formatErrorMessage} from '../../utils/utilityFunctions';

const BASE_URL = baseUrl;

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  timeout: 100000,
  prepareHeaders: async (headers, {getState}) => {
    const token = 'efbefbewfjb';
if (!headers?.has('Content-Type')) {
  headers.set('Content-Type', 'application/json');
}
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error && result?.error?.status === 401) {
    const refreshResult = await baseQuery('/refreshToken', api, extraOptions);
    if (refreshResult?.data) {
      //api.dispatch(tokenReceived(refreshResult.data));
      result = await baseQuery(args, api, extraOptions);
    } else {
      // api.dispatch(loggedOut());
    }
  }

  // if (result?.error) {
  //   Toast.show({
  //     type: 'error',
  //     text1: 'Error',
  //     // text2: formatErrorMessage(result?.error),
  //     position: 'top',
  //   });
  // }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'getPendingPayments',
    'getDashboardData',
    'getComplaint',
    'getRequest',
    'getMealsMenu',
    'getTenantProfile',
    'propertyProfile',
    'getPropertyList',
    'getBranchList'
  ],
  endpoints: () => ({}),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
});
