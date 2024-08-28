import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { httpGet, httpPost } from 'src/services/common';
import { LOADER_CLOSE, LOADER_OPEN } from 'src/store/actions/common';
import TYPES from 'src/store/constants/generic';
import { generateQueryString } from 'src/utils/common';

interface IHttpGetAllProps {
  // resource refer for routes(api end point)
  resource: string;
  // methods is object type and accept all slicer methods
  // To Do We will create method interface laterly
  methods: any;
  data: any;
}

export function* getAllListing(action: PayloadAction<IHttpGetAllProps>): any {
  const { resource, methods, data } = action.payload;
  try {
    yield put({ type: LOADER_OPEN });
    const result = yield call(httpGet, `${resource}?${generateQueryString(data)}`);
    /**
     * After success set data inside reducer
     */
    yield put(methods.getAll(result.data));

    yield put({ type: LOADER_CLOSE });
    return;
  } catch (error) {
    yield put({ type: LOADER_CLOSE });

    // yield put({ type: methods.setErrors, payload: error.data });

    return error;
  }
}

// Function generator (watcher )
export function* httpGetRequest(): any {
  yield takeLatest(TYPES.GET_DATA_REQUEST, getAllListing);
}

export function* getOne(action: PayloadAction<IHttpGetAllProps>): any {
  const { resource, methods } = action.payload;
  try {
    yield put({ type: LOADER_OPEN });
    const result = yield call(httpGet, `${resource}`);
    /**
     * After success set data inside reducer
     */
    yield put(methods.getOne(result.data));

    yield put({ type: LOADER_CLOSE });
    return;
  } catch (error) {
    yield put({ type: LOADER_CLOSE });

    // yield put({ type: methods.setErrors, payload: error.data });

    return error;
  }
}

// Function generator (watcher )
export function* httpGetOneRequest(): any {
  yield takeLatest(TYPES.GET_ONE_DATA_REQUEST, getOne);
}

export default function* genericSaga() {
  yield all([httpGetRequest(), httpGetOneRequest()]);
}
