import axios from 'axios';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User } from 'types/User';

interface AuthState {
  isAuthenticated: boolean;
  user?: User;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, name: string, password: string) => Promise<void>;
  setUser: (user?: User) => void;
}

const initialAuthState: AuthState = {
  isAuthenticated: false,
};

const initContextValue = {
  ...initialAuthState,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  setUser: () => {},
};

export const AuthContext = createContext<AuthContextValue>(initContextValue);

const setSession = (accessToken: string | null): void => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const initialize = async (): Promise<void> => {
      const accessToken = window.localStorage.getItem('accessToken');
      if (accessToken) {
        setSession(accessToken);

        const response = await axios.get<User>(`${process.env.REACT_APP_API_URL}/api/user`);
        const user = response.data;
        setUser(user);

        navigate(location.pathname);
      }
    };

    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (email: string, password: string) => {
    const response = await axios.post<{ accessToken: string; user: User }>(
      `${process.env.REACT_APP_API_URL}/api/login`,
      {
        email,
        password,
      }
    );

    const { accessToken, user } = response.data;

    setSession(accessToken);
    setUser(user);

    navigate('/dashboard');
  };

  const register = async (email: string, name: string, password: string) => {
    await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, {
      email,
      name,
      password,
    });
  };

  const logout = () => {
    setSession(null);
    setUser(undefined);
    navigate('/login');
  };

  const [contextValue, setContextValue] = useState<AuthContextValue>({
    ...initContextValue,
    login,
    logout,
    register,
    setUser,
  });

  useEffect(() => {
    setContextValue({
      ...contextValue,
      user,
      isAuthenticated: !!user,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
