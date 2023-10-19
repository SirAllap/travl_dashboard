import React, { ReactNode, useReducer, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthInitialState {
  auth: boolean;
  name: string | null;
  email: string | null;
  profilePicture: string | null;
}

const checkInitialState = (): AuthInitialState => {
  return localStorage.getItem('authenticated')
    ? {
        auth: true,
        name: JSON.parse(localStorage.getItem('currentUser') || '').userName,
        email: JSON.parse(localStorage.getItem('currentUser') || '').email,
        profilePicture: localStorage.getItem('profilePicture') || '',
      }
    : {
        auth: false,
        name: null,
        email: null,
        profilePicture: null,
      };
};

type AuthAction =
  | {
      type: 'login';
      payload: {
        userName: string;
        email: string;
        profilePicture: string;
      };
    }
  | {
      type: 'updateUserInfo';
      payload: {
        userName: string;
        email: string;
        profilePicture: string;
      };
    }
  | { type: 'logout' };

const authenticatorReducer = (state: AuthInitialState, action: AuthAction): AuthInitialState => {
  switch (action.type) {
    case 'login':
    case 'updateUserInfo':
      return {
        auth: true,
        name: action.payload.userName,
        email: action.payload.email,
        profilePicture: action.payload.profilePicture,
      };
    case 'logout':
      return {
        auth: false,
        name: null,
        email: null,
        profilePicture: null,
      };
    default:
      return state;
  }
};

interface AuthenticationContextProps {
  children: ReactNode;
}

interface LoginReducer {
  userName: string;
  email: string;
  profilePicture: string;
}

export const useAuth = () => {
  const context = useContext(authenticationContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthenticationContextProvider');
  }
  return context;
};

interface AuthContextValue {
  login: (data: LoginReducer) => void;
  updateUserInfo: (data: LoginReducer) => void;
  logout: () => void;
  authState: AuthInitialState;
}

export const authenticationContext = createContext<AuthContextValue | null>(null)

const AuthenticationContextProvider: React.FC<AuthenticationContextProps> = ({ children }) => {
  const navigate = useNavigate();

  const [authState, dispatch] = useReducer(authenticatorReducer, checkInitialState());

  const login = ({ userName, email, profilePicture }: LoginReducer) => {
    dispatch({
      type: 'login',
      payload: { userName, email, profilePicture },
    });
    localStorage.setItem(
      'currentUser',
      JSON.stringify({
        userName: userName,
        email: email,
      })
    );
    localStorage.setItem('profilePicture', profilePicture);
    localStorage.setItem('authenticated', 'true');
    navigate('/');
  };

  const updateUserInfo = ({ userName, email, profilePicture }: LoginReducer) => {
    dispatch({
      type: 'updateUserInfo',
      payload: { userName, email, profilePicture },
    });

    localStorage.setItem(
      'currentUser',
      JSON.stringify({
        userName: userName,
        email: email,
      })
    );
    localStorage.setItem('profilePicture', profilePicture);
    localStorage.setItem('authenticated', 'true');
  };

  const logout = () => {
    dispatch({ type: 'logout' });
    localStorage.clear();
    navigate('/login');
  };

  return (
    <authenticationContext.Provider
      value={{
        login,
        updateUserInfo,
        logout,
        authState,
      }}
    >
      {children}
    </authenticationContext.Provider>
  );
};

export default AuthenticationContextProvider;
