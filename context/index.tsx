import {createContext, PropsWithChildren, ReactNode, useEffect, useState} from 'react';
import {UserInterface} from "../interfaces/user.interface";

export interface IAppContext {
  auth: boolean;
}

export const AppContext = createContext<IAppContext>({auth: false});

export const AppContextProvider = ({ auth, children }: PropsWithChildren<IAppContext>): JSX.Element => {
  const [authState, setAuth] = useState<boolean>(false);

  useEffect(() => {
      if (process.browser) {
          const localStorageData = localStorage.getItem('user');
          if (localStorageData) {
              setAuth(true);
          }
      }
  }, [auth]);

  return <AppContext.Provider value={{auth: authState}} >
      { children }
        </AppContext.Provider>;
      };