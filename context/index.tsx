import {createContext, PropsWithChildren, ReactNode, useEffect, useState} from 'react';
import {UserInterface} from "../interfaces/user.interface";

export interface IAppContext {
  auth: boolean;
  setAuth: Function | null;
}

export interface IMenuItemsContext {
    selectedIndex: number;
    setSelectedIndex: Function | null;
}

export const AppContext = createContext<IAppContext>({auth: false, setAuth: null});

export const MenuItemsContext = createContext<IMenuItemsContext>({selectedIndex: 0, setSelectedIndex: null});

export const AppContextProvider = ({ auth, setAuth, children }: PropsWithChildren<IAppContext>): JSX.Element => {
  const [authState, setAuthState] = useState<boolean>(false);

  useEffect(() => {
      if (process.browser) {
          const localStorageData = localStorage.getItem('user');
          if (localStorageData) {
              setAuthState(true);
          }
      }
  }, [auth]);

  return <AppContext.Provider value={{auth: authState, setAuth: setAuthState}} >
      { children }
        </AppContext.Provider>;
      };