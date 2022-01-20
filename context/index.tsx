import { createContext, PropsWithChildren, ReactNode, useState } from 'react';
import {UserInterface} from "../interfaces/user.interface";

export interface IAppContext {
  user: UserInterface[];
  setUser?: (newUser: UserInterface[]) => void;
}

export const AppContext = createContext<IAppContext>({ user: [] });

export const AppContextProvider = ({ user, children }: PropsWithChildren<IAppContext>): JSX.Element => {
  const [userState, setUserState] = useState<UserInterface[]>(user);

  const setUser = (newUser: UserInterface[]) => {
    setUserState(newUser);
  }

  return <AppContext.Provider value={{user: userState, setUser}} >
      { children }
        </AppContext.Provider>;
      };