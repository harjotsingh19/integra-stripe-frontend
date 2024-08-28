import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { httpGet, httpPost } from 'src/services/common';
import URL from 'src/services/urls';
import { LOADER_CLOSE, LOADER_OPEN } from 'src/store/actions/common';
import { SNACKBAR_OPEN } from 'src/store/constants/common';
import TYPES from 'src/store/constants/transactions';

import { setPlans, setTokenPrice, setVerificationResults } from 'src/store/slicers/transactions';

interface IHttpGetAllProps {
  resource: string;
  methods: any;
  data: any;
}

export function* sendPaymentLink(action: PayloadAction<any>): any {
  const { payload } = action;

  const restrictedPayload = {
    emailId: payload?.email,
    token: payload?.token,
    customerId: payload.customerId,
  };

  try {
    yield put({ type: LOADER_OPEN });
    const result = yield call(httpPost, URL.INITIATE_PAYMENT, restrictedPayload);
    yield put({
      type: TYPES.TRANSACTION_CREATE_REQUEST,
      payload: {
        emailId: payload?.email,
        customerId: payload.customerId,
        tokenPrice: payload.tokenPrice,
        numberOfTokens: payload.numberOfTokens,
        integraPublicKeyId: payload.integraPublicKeyId,
        paymentMethodId: result?.data?.paymentIntent?.id,
      },
    });
    yield put({ type: LOADER_CLOSE });
    return result;
  } catch (error) {
    yield put({
      type: SNACKBAR_OPEN,
      payload: {
        open: true,
        message: error?.response?.data?.message ?? error?.message,
        severity: 'error',
      },
    });
    yield put({ type: LOADER_CLOSE });
    return error;
  }
}
// Function generator (watcher )
export function* sendPaymentLinkRequest(): any {
  yield takeLatest(TYPES.TRANSACTION_INITIATE_REQUEST, sendPaymentLink);
}
export function* createPayment(action: PayloadAction<any>): any {
  const { payload } = action;
  try {
    yield put({ type: LOADER_OPEN });
    const result = yield call(httpPost, URL.CREATE_PAYMENT, payload);
    yield put({
      type: SNACKBAR_OPEN,
      payload: {
        open: true,
        message: result?.message,
        severity: 'success',
      },
    });
    yield put({ type: LOADER_CLOSE });
    return result;
  } catch (error) {
    yield put({
      type: SNACKBAR_OPEN,
      payload: {
        open: true,
        message: error?.response?.data?.message ?? error?.message,
        severity: 'error',
      },
    });
    yield put({ type: LOADER_CLOSE });
    return error;
  }
}
// Function generator (watcher )
export function* createPaymentRequest(): any {
  yield takeLatest(TYPES.TRANSACTION_CREATE_REQUEST, createPayment);
}

export function* getTokenPrize(): any {
  try {
    yield put({ type: LOADER_OPEN });
    const result = yield call(httpGet, `${URL.TOKEN_PRIZE}`);
    yield put(setTokenPrice(result?.data?.tokenPrice));
    yield put({ type: LOADER_CLOSE });
    return result;
  } catch (error: any) {
    yield put({ type: LOADER_CLOSE });
    return error;
  }
}

export function* getTokenPrizeRequest() {
  yield takeLatest(TYPES.TRANSACTION_TOKEN_PRIZE, getTokenPrize);
}

export function* getPlans(): any {
  try {
    yield put({ type: LOADER_OPEN });
    const result = yield call(httpGet, `${URL.PRICING_PLANS}`);
    yield put(setPlans(result?.data?.subscriptionPlans));

    yield put({ type: LOADER_CLOSE });
    return result;
  } catch (error: any) {
    yield put({ type: LOADER_CLOSE });
    return error;
  }
}

export function* getPlansRequest() {
  yield takeLatest(TYPES.PRICING_PLANS, getPlans);
}

export function* planCheckout(action: PayloadAction<any>): any {
  const { payload } = action;
  try {
    yield put({ type: LOADER_OPEN });
    const result = yield call(httpPost, `${URL.PLAN_CHECKOUT}`, payload);
    // yield put(setPlans(result?.data?.subscriptionPlans));
    window.open(result?.data?.url ?? result?.url);

    yield put({ type: LOADER_CLOSE });
    return result;
  } catch (error: any) {
    yield put({ type: LOADER_CLOSE });
    return error;
  }
}

export function* planCheckoutRequest() {
  yield takeLatest(TYPES.PLAN_CHECKOUT, planCheckout);
}

export function* paymentVerification(action: PayloadAction<any>): any {
  const { payload } = action;
  try {
    yield put({ type: LOADER_OPEN });
    const result = yield call(httpGet, `${URL.PLAN_VERIFY}?sessionId=${payload.session_id}`);
    yield put(setVerificationResults(result?.data?.success));
    yield put({ type: LOADER_CLOSE });
    return result;
  } catch (error: any) {
    yield put({ type: LOADER_CLOSE });
    return error;
  }
}

export function* paymentVerificationRequest() {
  yield takeLatest(TYPES.PAYMENT_VERIFICATION, paymentVerification);
}

export default function* transactionSaga() {
  yield all([
    // transactionListingRequest(),
    sendPaymentLinkRequest(),
    // checkIsTokenValidRequest(),
    // subscribeWithPaymentRequest(),
    // cancelSubscriptionRequest(),
    getTokenPrizeRequest(),
    createPaymentRequest(),
    getPlansRequest(),
    planCheckoutRequest(),
    paymentVerificationRequest(),
  ]);
}
