import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  loginResponse: object;
   isLoggedIn: boolean;
  
}

const initialState: AuthState = {
  loginResponse: {},
  isLoggedIn: false,
  
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setLoginResponse: (state, action: PayloadAction<object>) => {
      state.loginResponse = action.payload;
      state.isLoggedIn = true; 
    },
    setFcmToken: (state, action: PayloadAction<string>) => {
      state.fcmToken = action.payload; 
    },

    resetAuth: state => {
      Object.assign(state, initialState);
    },
  },
});

export const {
 
  setLoginResponse,
  setFcmToken,
  resetAuth,
} = authSlice.actions;


export default authSlice.reducer;
