// import { PayloadAction } from '@reduxjs/toolkit';
// import { all, call, put, takeLatest } from 'redux-saga/effects';
// import { IResetPasswordProps } from 'src/pages/change-password';
// import { paths } from 'src/paths';
// import { httpPut } from 'src/services/common';
// import URL from 'src/services/urls';
// import { LOADER_CLOSE, LOADER_OPEN } from 'src/store/actions/common';
// import { redirectTo } from 'src/store/actions/redirection';
// import TYPES from 'src/store/constants/auth';
// import { SNACKBAR_OPEN } from 'src/store/constants/common';

// export function* resetPassword(action: PayloadAction<{ data: IResetPasswordProps }>): any {
//   const { data } = action.payload;
//   try {
//     yield put({ type: LOADER_OPEN });
//     const result = yield call(httpPut, `${URL.RESET_PASSWORD}`, data);
//     yield put({
//       type: SNACKBAR_OPEN,
//       payload: {
//         open: true,
//         message: result?.message,
//         severity: 'success',
//       },
//     });
//     yield put({ type: LOADER_CLOSE });
//     return result;
//   } catch (error) {
//     yield put({
//       type: SNACKBAR_OPEN,
//       payload: {
//         open: true,
//         message: error?.data?.message,
//         severity: 'error',
//       },
//     });
//     yield put({ type: LOADER_CLOSE });
//     return error;
//   }
// }
// // Function generator (watcher )
// export function* resetPasswordRequest(): any {
//   yield takeLatest(TYPES.RESET_PASSWORD_REQUEST, resetPassword);
// }

// export default function* userSaga() {
//   yield all([resetPasswordRequest()]);
// }
