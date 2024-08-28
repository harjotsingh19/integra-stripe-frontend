import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import rootReducer from 'src/store/reducers';
import rootSaga from 'src/store/sagas';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const Store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(middleware),
});

sagaMiddleware.run(rootSaga);
const persiststore = persistStore(Store);

export { persiststore, Store };
