import { combineReducers } from 'redux';
// Common reducer
import customizationReducer from 'src/store/reducers/common/customizationReducer';
import snackbarReducer from 'src/store/reducers/common/snackbarReducer';
import redirection from 'src/store/reducers/redirection';
import transactionSlice from 'src/store/slicers/transactions';
// import userSlice from 'src/store/slicers/user';

const rootReducer = combineReducers({
  customization: customizationReducer,
  snackbar: snackbarReducer,
  redirection,
  // user: userSlice,
  transactions: transactionSlice,
});

export type rootReducersState = ReturnType<typeof rootReducer>;
export default rootReducer;
