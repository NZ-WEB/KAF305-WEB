import {LayoutProps} from "./Layout.props";
import {FunctionComponent, useContext, useState} from "react";
import {AppContext, AppContextProvider} from "../context";
import AppDrawer from "./layout-components/AppDrawer/AppDrawer";
import Header from "./Header/Header";
import styles from './Layout.module.css';
import {Sidebar} from "./Sidebar/Sidebar";
import {CustomCurd} from "../src/components/CustomCard/CustomCurd";
import Head from "next/head";
import {useRouter} from "next/router";
import Link from 'next/link';


export const Layuot = ({children}: LayoutProps): JSX.Element => {
    const router = useRouter();
    const {auth, setAuth} = useContext(AppContext);

    return (
        <div className={styles.main}>
            <Head>
                <link
                    rel="preload"
                    href="../public/fonts/PlusJakartaSans/PlusJakartaSans%5Bwght%5D.ttf"
                    as="font"
                />
                <title>Кафедра 305 - МАИ</title>
            </Head>

            <div className={styles.grid}>
                <div className={styles.header}>
                    <Header auth={auth} setAuth={() => setAuth()}/>
                </div>
                <div className={styles.sidebar}>
                    <Sidebar/>
                </div>
                <div className={styles.body}>
                    <CustomCurd>
                        {children}
                    </CustomCurd>
                </div>
            </div>

        </div>
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
            <AppContextProvider auth={authorized}>
                <Layuot authorized={authorized}>
                    <Component {...props} />
                </Layuot>
            </AppContextProvider>
        );
    };
};