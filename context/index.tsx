import { createContext, PropsWithChildren, useEffect, useState } from 'react';

export interface IAppContext {
  auth: boolean;
  setAuth(value: boolean);
}

export const AppContext = createContext<IAppContext>({
  auth: false,
  setAuth: null,
});

export const AppContextProvider = ({
  auth,
  children,
}: PropsWithChildren<IAppContext>): JSX.Element => {
  const [authState, setAuthState] = useState<boolean>(false);

  useEffect(() => {
    if (process.browser) {
      const localStorageData = localStorage.getItem('user');
      if (localStorageData) {
        setAuthState(true);
      }
    }
  }, [auth]);

  return (
    <AppContext.Provider value={{ auth: authState, setAuth: setAuthState }}>
      {children}
    </AppContext.Provider>
  );
};
