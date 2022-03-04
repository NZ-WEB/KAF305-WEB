import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { AppDrawerProps } from './AppDrawer.props';
import { useContext } from 'react';
import { Button, Chip, Link } from '@mui/material';
import { AppContext } from '../../../context';
import { TheAppBar } from '../../../src/components';
import AppSideBarListItem from '../../../src/components/AppSideBarListItem/AppSideBarListItem';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function AppDrawer({ children }: AppDrawerProps) {
  const theme = useTheme();
  const { auth, setAuth } = useContext(AppContext);

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getCurrentUser = () => {
    if (process.browser) {
      const user = JSON.parse(localStorage.getItem('user'));
      return user.username;
    }
    return null;
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <TheAppBar
        handleDrawerOpen={() => handleDrawerOpen()}
        auth={auth}
        setAuth={setAuth}
        open={open}
      />

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{ px: '1em' }}>
          <Typography sx={{ flexGrow: 1, fontWeight: '500' }} variant={'h5'}>
            Меню
          </Typography>
          {auth ? (
            <Chip label={getCurrentUser()} />
          ) : (
            <Link href={`/login`}>
              <Button variant="contained">Войти</Button>
            </Link>
          )}
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <List>
          {auth && (
            <List
              sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              <AppSideBarListItem title="Сотрудники" expanding={true}>
                <AppSideBarListItem
                  title="Добавить сотрудника"
                  route="/member/create"
                />
              </AppSideBarListItem>
              <AppSideBarListItem title="Домашняя страница" expanding={true}>
                <AppSideBarListItem title="Новости" expanding={true}>
                  <AppSideBarListItem
                    title="Добавить новость"
                    route="/home-page/news/create"
                  />
                </AppSideBarListItem>
              </AppSideBarListItem>
            </List>
          )}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />

        {children}
      </Main>
    </Box>
  );
}
