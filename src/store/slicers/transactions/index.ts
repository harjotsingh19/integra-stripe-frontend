import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  transactionList: [],
  totalCount: 0,
  isLoadingTokenValidation: false,
  isTokenValid: false,
  hospitalUuid: '',
  isProcessingPayment: false,
  paymentStatus: '',
  tokenPrize: null,
  pricingPlans: [],
  isVerifiedPayment: null,
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,

  reducers: {
    getAllTransections: (state, data) => {
      state.totalCount = data?.payload?.data.totalCount;
      state.transectionList = data?.payload?.data.records;
    },
    getOne: (state, data) => {
      state.transectionDetail = data?.payload;
    },
    setLoadingTokenValidation: (state, data) => {
      state.isLoadingTokenValidation = data?.payload;
    },
    setTokenValid: (state, data) => {
      state.isTokenValid = data?.payload.isValid;
      state.hospitalUuid = data?.payload.hospitalUuid;
    },
    setPaymentStatus: (state, data) => {
      state.isProcessingPayment = data?.payload.isProcessingPayment;
      state.paymentStatus = data?.payload.status;
    },
    setTokenPrice: (state, data) => {
      state.tokenPrize = data?.payload;
    },
    setPlans: (state, data) => {
      state.pricingPlans = data?.payload;
    },
    setVerificationResults: (state, data) => {
      state.isVerifiedPayment = data?.payload;
    },
  },
});

export const {
  getAllTransections,
  getOne,
  setTokenValid,
  setLoadingTokenValidation,
  setPaymentStatus,
  setTokenPrice,
  setPlans,
  setVerificationResults,
} = transactionSlice.actions;
export default transactionSlice.reducer;
