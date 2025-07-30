import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ComplianceState {
  isComplianceTestGiven: boolean;
  complianceResult:object; 
}

const initialComplianceState: ComplianceState = {
  isComplianceTestGiven: false,
  complianceResult: {}, 
};

export const complianceSlice = createSlice({
  name: 'complianceSlice',
  initialState: initialComplianceState,
  reducers: {
    setComplianceTestGiven: (state, action: PayloadAction<boolean>) => {
      console.log('action.payload', action.payload);
      state.isComplianceTestGiven = action.payload;
    },

    setComplianceResult: (state, action: PayloadAction<Record<string, any>>) => {
      state.complianceResult = action.payload;
    },

    resetCompliance: (state) => {
      state.isComplianceTestGiven = false;
      state.complianceResult = {}; 
    },
  },
});

export const {
  setComplianceTestGiven,
  resetCompliance,
  setComplianceResult,
} = complianceSlice.actions;

export default complianceSlice.reducer;
