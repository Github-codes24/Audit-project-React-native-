import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  cookiesStatus: '',
};

export const cookiesStateSlice = createSlice({
  name: 'cookiesStateSlice',
  initialState,
  reducers: {
    acceptCookies: (state) => {
      state.cookiesStatus = 'accepted';
    },
    rejectCookies: (state) => {
      state.cookiesStatus = 'rejected';
    },
    customizeCookies: (state) => {
      state.cookiesStatus = 'customized';
    },
    resetCookies: (state) => {
      state.cookiesStatus = ''; // Correctly resetting the state
    },
  },
});

export const {
  acceptCookies,
  rejectCookies,
  customizeCookies,
  resetCookies, // Exporting resetCookies
} = cookiesStateSlice.actions;

export default cookiesStateSlice.reducer;
