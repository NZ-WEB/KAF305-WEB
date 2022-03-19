import { LayoutProps } from './Layout.props';
import { FunctionComponent, useState } from 'react';
import { AppContextProvider } from '../context';
import AppDrawer from './layout-components/AppDrawer/AppDrawer';
import { Container } from '@mui/material';

export const Layuot = ({ children, authorized }: LayoutProps): JSX.Element => {
  return (
    <>
      <Container>
        <AppDrawer authorized={authorized}>{children}</AppDrawer>
      </Container>
    </>
  );
};

export const withLayout = <T extends Record<string, unknown>>(
  Component: FunctionComponent<T>,
) => {
  return function withLayoutComponent(props: T): JSX.Element {
    const [authorized, setAuthorized] = useState<boolean>(
      process.browser && !!localStorage.getItem('user'),
    );

    return (
      <AppContextProvider auth={authorized} setAuth={setAuthorized}>
        <Layuot authorized={authorized}>
          <Component {...props} />
        </Layuot>
      </AppContextProvider>
    );
  };
};
