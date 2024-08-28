import { AlertColor } from '@mui/material';
import { PayloadAction } from '@reduxjs/toolkit';
import * as actionTypes from 'src/store/constants/common';

export interface ISnackbarProperties {
  open: boolean;
  message: string;
  severity: AlertColor;
}

const initialState: ISnackbarProperties = {
  open: false,
  message: '',
  severity: 'success',
};

const snackbarReducer = (state = initialState, action: PayloadAction<ISnackbarProperties>) => {
  switch (action.type) {
    case actionTypes.SNACKBAR_OPEN:
      return {
        ...state,
        open: action.payload.open ?? state.open,
        message: action.payload.message ?? state.message,
        severity: action.payload.severity ?? state.severity,
      };
    case actionTypes.SNACKBAR_CLOSE:
      return {
        ...state,
        open: false,
        message: '',
      };
    default:
      return state;
  }
};

export default snackbarReducer;
