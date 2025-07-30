import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface EligibilityState {
  isEligibilityTestGiven: boolean;
   EligibilityResult:object;
}

const initialEligibilityState: EligibilityState = {
  isEligibilityTestGiven: false,  
   EligibilityResult:{}
};

export const eligibilitySlice = createSlice({
  name: 'eligibilitySlice',
  initialState: initialEligibilityState,
  reducers: {
    setEligibilityTestGiven: (state, action: PayloadAction<boolean>) => {
      console.log('action.payload',action.payload)
      state.isEligibilityTestGiven = action.payload;  
    },

     setEligibilityResult: (state, action: PayloadAction<object>) => {
      state.EligibilityResult = action.payload;
    },

    resetEligibility: state => {
      state.isEligibilityTestGiven = false; 
      state.EligibilityResult = {};
    },
  },
});

export const {
  setEligibilityTestGiven,
  resetEligibility,
  setEligibilityResult,
} = eligibilitySlice.actions;

export default eligibilitySlice.reducer;