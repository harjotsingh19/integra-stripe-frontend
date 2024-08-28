/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import type { FC, ReactNode } from 'react';
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import LocalStorageService from 'src/services/LocalStorageService';
import { httpGet, httpPost } from 'src/services/common';
import URL from 'src/services/urls';
import { LOADER_CLOSE, LOADER_OPEN, SNACKBAR_OPEN } from 'src/store/constants/common';
// import { IUser } from 'src/types/user';
import type { State } from './auth-context';
import { AuthContext, initialState } from './auth-context';

export const enum ActionType {
  INITIALIZE = 'INITIALIZE',
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
  SIGN_OUT = 'SIGN_OUT',
}

//fixme: any will fix in future
type InitializeAction = {
  type: ActionType.INITIALIZE;
  payload: {
    isAuthenticated: boolean;
    user: any | null;
  };
};

type SignInAction = {
  type: ActionType.SIGN_IN;
  payload: {
    isAuthenticated: boolean;
    user: any;
  };
};

type SignUpAction = {
  type: ActionType.SIGN_UP;
  payload: {
    user: any;
  };
};

type SignOutAction = {
  type: ActionType.SIGN_OUT;
};

type Action = InitializeAction | SignInAction | SignUpAction | SignOutAction;

type Handler = (state: State, action: any) => State;

const handlers: Record<ActionType, Handler> = {
  INITIALIZE: (state: State, action: InitializeAction): State => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  SIGN_IN: (state: State, action: SignInAction): State => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  SIGN_UP: (state: State, action: SignUpAction): State => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  SIGN_OUT: (state: State): State => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
};

const reducer = (state: State, action: Action): State =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

interface AuthProviderProps {
  children: ReactNode;
}

export type TStoreToken = {
  accessToken: string;
  deviceId: string;
  id: number;
  refreshToken: string;
};

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const reduxDispatch = useDispatch();
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async (): Promise<void> => {
    try {
      const tokenData = await JSON.parse(LocalStorageService.getAccessToken() ?? '');
      if (tokenData.accessToken) {
        const user: any = await httpGet(URL.USER_ME);
        // const { id } = user?.data;
        // const data = { id };
        // LocalStorageService.setToken(JSON.stringify(data));
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: true,
            user,
          },
        });
      } else {
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (err) {
      dispatch({
        type: ActionType.INITIALIZE,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [dispatch]);

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const signIn = useCallback(
    async (email: string, password: string, device: string): Promise<void> => {
      reduxDispatch({ type: LOADER_OPEN });
      const result: any = await httpPost(URL.LOGIN, {
        email: email,
        password: password,
        deviceId: device,
      });
      const { accessToken, userData, refreshToken } = result?.data ?? {};
      const { id } = userData ?? {};
      const data: TStoreToken = { accessToken, id, deviceId: device, refreshToken };
      LocalStorageService.setToken(JSON.stringify(data));
      reduxDispatch({ type: LOADER_CLOSE });
      reduxDispatch({
        type: SNACKBAR_OPEN,
        payload: {
          open: true,
          message: result.message,
          severity: 'success',
        },
      });
      const user: any = await httpGet(URL.USER_ME);
      dispatch({
        type: ActionType.SIGN_IN,
        payload: {
          isAuthenticated: true,
          user,
        },
      });
    },
    [dispatch]
  );

  const signUp = useCallback(
    async (email: string, name: string, password: string): Promise<void> => {
      const user: any = { name: 'dev@yopmail.com' };

      dispatch({
        type: ActionType.SIGN_UP,
        payload: {
          user,
        },
      });
    },
    [dispatch]
  );

  const signOut = useCallback(
    async (deviceId: string, id: number): Promise<void> => {
      try {
        reduxDispatch({ type: LOADER_OPEN });
        const result: any = await httpPost(URL.LOGOUT, {
          deviceId: deviceId,
          userId: id,
        });

        const clearToken = LocalStorageService.logout();
        reduxDispatch({ type: LOADER_CLOSE });
        reduxDispatch({
          type: SNACKBAR_OPEN,
          payload: {
            open: true,
            message: result.message,
            severity: 'success',
          },
        });
        dispatch({ type: ActionType.SIGN_OUT });
        return result;
      } catch (error) {
        reduxDispatch({ type: LOADER_CLOSE });
        dispatch({ type: ActionType.SIGN_OUT });
        throw error;
      }
    },
    [dispatch]
  );
  const authProperties = useMemo(
    () => ({
      ...state,
      signIn,
      signUp,
      signOut,
      initialize,
    }),
    [initialize, signIn, signUp, signOut, state]
  ); // value is cached by useMemo
  return <AuthContext.Provider value={authProperties}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
