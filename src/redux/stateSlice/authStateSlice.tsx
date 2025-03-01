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
    
    resetAuth: state => {
      Object.assign(state, initialState);
    },
  },
});

export const {
 
  setLoginResponse,
  resetAuth,
} = authSlice.actions;

// Export the authSlice.reducer to be included in the store.
export default authSlice.reducer;
