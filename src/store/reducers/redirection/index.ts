import { PayloadAction } from '@reduxjs/toolkit';
import LocalStorageService from 'src/services/LocalStorageService';
import { REDIRECT_TO, CLEAR_REDIRECTION, UPDATE_TAB_INDEX } from 'src/store/constants/common';

interface IRedirectionState {
  target: string | null;
  tabIndex: number;
}

const initialState: IRedirectionState = {
  target: null,
  tabIndex: 1,
};

const redirection = (
  state = initialState,
  action: PayloadAction<IRedirectionState>
): IRedirectionState => {
  switch (action.type) {
    case REDIRECT_TO:
      return { ...state, target: action?.payload?.target };

    case CLEAR_REDIRECTION:
      return { ...state, target: null };

    case UPDATE_TAB_INDEX:
      return { ...state, tabIndex: state.tabIndex + 1 };

    default:
      return state;
  }
};

export default redirection;
