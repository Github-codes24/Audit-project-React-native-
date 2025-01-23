import {createSlice, PayloadAction} from '@reduxjs/toolkit';


const initialState = {
 cookiesStatus :'',
};

export const cookiesStateSlice = createSlice({
  name: 'cookiesStateSlice',
  initialState,
  reducers: {
    acceptCookies: (state) => {
     state.cookiesStatus = 'accepted';
    },
    
    rejectCookies: state => {
      state.cookiesStatus = 'rejected';
    },
    customizeCookies: (state) => {
      state.cookiesStatus = 'customized';
    },
  },
});

export const {
 acceptCookies,
 rejectCookies,
 customizeCookies,
} = cookiesStateSlice.actions;

// Export the authSlice.reducer to be included in the store.
export default cookiesStateSlice.reducer;
