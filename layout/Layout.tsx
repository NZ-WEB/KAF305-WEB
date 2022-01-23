import {LayoutProps} from "./Layout.props";
import {FunctionComponent, useState} from "react";
import {AppContextProvider} from "../context";
import AppDrawer from "./layout-components/AppDrawer/AppDrawer";

export const Layuot = ({children, authorized}: LayoutProps): JSX.Element => {
    return (
        <>
            <AppDrawer authorized={authorized}>
                {children}
            </AppDrawer>
        </>
    );
};

export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
    return function withLayoutComponent(props: T): JSX.Element {
        const [authorized, setAuthorizes] = useState<boolean>(
            process.browser && (localStorage.getItem('user') ? true : false)
        );

        console.log(authorized, 'authorized')

        let user = [];

        if (process.browser) {
            const localStorageUserData = localStorage.getItem('user');
            if (authorized) {
                user = JSON.stringify(localStorageUserData);
            }
        }
        return (
            <AppContextProvider user={ user ? user : [] } >
                <Layuot authorized={authorized}>
                    <Component {...props} />
                </Layuot>
            </AppContextProvider>
        );
    };
};