import { all, fork } from 'redux-saga/effects';
import genericSaga from 'src/store/sagas/generic/generic.saga';

import transactionSaga from './transactions/transaction.saga';
// import userSaga from './user/user.saga';

export default function* rootSaga(): any {
  // yield all([fork(genericSaga), fork(userSaga), fork(transactionSaga)]);
  yield all([fork(genericSaga), fork(transactionSaga)]);
}
