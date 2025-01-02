import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  loginResponse: object;
}

const initialState: AuthState = {
  loginResponse: {},
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setLoginResponse: (state, action: PayloadAction<object>) => {
      state.loginResponse = action?.payload;
    },
    
    resetAuth: state => {
      // Reset the entire state to its initial state
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
