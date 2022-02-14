import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { AppDrawerProps } from './AppDrawer.props';
import { useContext } from 'react';
import { ExpandLess } from '@mui/icons-material';
import { Collapse, ListItemButton, ListSubheader } from '@mui/material';
import { useRouter } from 'next/router';
import { AppContext } from '../../../context';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PeopleIcon from '@mui/icons-material/People';
import AddIcon from '@mui/icons-material/Add';
import { TheAppBar } from '../../../src/components';

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
  const router = useRouter();
  const { auth, setAuth } = useContext(AppContext);

  const [open, setOpen] = React.useState(true);
  const [collapseFirstIsOpened, setCollapseFirstIsOpened] =
    React.useState(false);
  const [collapseSecondIsOpened, setCollapseSecondIsOpened] =
    React.useState(false);

  const handleFirstClick = () => {
    setCollapseFirstIsOpened(!collapseFirstIsOpened);
  };
  const handleSecondClick = () => {
    setCollapseSecondIsOpened(!collapseSecondIsOpened);
  };

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
        setAuth={() => setAuth()}
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
        <DrawerHeader>
          <Typography sx={{ flexGrow: 1, fontWeight: '500' }} variant={'h5'}>
            Меню
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider />

        <List>
          {auth && (
            <List
              sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  {auth && getCurrentUser()}
                </ListSubheader>
              }
            >
              <ListItemButton onClick={handleFirstClick}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Сотрудники" />
                {collapseFirstIsOpened ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={collapseFirstIsOpened} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    onClick={() => router.push('/member/create')}
                    sx={{ pl: 4 }}
                  >
                    <ListItemIcon>
                      <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Добавить сотрудника" />
                  </ListItemButton>
                </List>
              </Collapse>

              <ListItemButton onClick={handleSecondClick}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Главная страница" />
                {collapseSecondIsOpened ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse
                in={collapseSecondIsOpened}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  <ListItemButton
                    onClick={() => router.push('/home-page/news/create')}
                    sx={{ pl: 4 }}
                  >
                    <ListItemIcon>
                      <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Добавить новость" />
                  </ListItemButton>
                </List>
              </Collapse>
            </List>
          )}
        </List>

        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />

        {children}
      </Main>
    </Box>
  );
}
