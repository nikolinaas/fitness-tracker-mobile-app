import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { isTokenValid } from '../services/JWTService';

interface LoginContextType {
  //  user :any;
  userId: any;
  token: any;
  logedin: any;
  login: any;
}

interface LoginProviderProps {
  children: ReactNode;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

const LoginProvider: FC<LoginProviderProps> = ({ children }) => {
  // const [user, setUser] = useState(null);
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const [logedin, setlogedin] = useState(false);

  async function login() {
    const log = await isTokenValid();
    setlogedin(log);
    return log;
  }

  return (
    <LoginContext.Provider value={{ userId, token, logedin, login }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;

export const useLogin = () => {
  return useContext(LoginContext);
};
