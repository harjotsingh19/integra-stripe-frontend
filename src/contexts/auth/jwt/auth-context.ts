import { createContext } from 'react';

export interface State {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: any | null;
}

export const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

export interface AuthContextType extends State {
  signIn: (email: string, password: string, deviceId: string) => Promise<void>;
  signUp: (email: string, name: string, password: string) => Promise<void>;
  signOut: (deviceId: string, id: number) => Promise<void>;
  initialize: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  ...initialState,
  signIn: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
  initialize: () => Promise.resolve(),
});
