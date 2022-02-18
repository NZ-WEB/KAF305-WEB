import { TheAppBarProps } from './TheAppBar.props';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { AccountCircle } from '@mui/icons-material';
import { Menu, MenuItem } from '@mui/material';
import Link from 'next/link';
import Button from '@mui/material/Button';
import * as React from 'react';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import { AppBarProps } from '../../../interfaces/Drawer/Drawer.interfaces';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const TheAppBar = ({
  handleDrawerOpen,
  auth,
  setAuth,
  open,
}: TheAppBarProps): JSX.Element => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.clear();
    setAuth(false);
    handleClose();
  };

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>

        <img
          src="https://dev.mai.ru/generic/images/logo/mai-web.svg"
          alt="MAI"
          loading="lazy"
          width="40px"
          onClick={() => router.push('/')}
          style={{ cursor: 'pointer' }}
        />

        <Typography
          style={{ cursor: 'pointer' }}
          onClick={() => router.push('/')}
          sx={{ flexGrow: 1 }}
          variant={'h6'}
          marginLeft="5px"
        >
          Кафедра 305
        </Typography>

        {auth ? (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Мой профиль</MenuItem>
              <MenuItem onClick={handleClose}>Мой аккаунт</MenuItem>
              <MenuItem onClick={() => logout()}>Выйти</MenuItem>
            </Menu>
          </div>
        ) : (
          <Link href={`/login`}>
            <Button color="secondary" variant="outlined">
              Войти
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};
