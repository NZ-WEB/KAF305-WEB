import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import {AppBarProps} from "../../../interfaces/Drawer/Drawer.interfaces";
import {AppDrawerProps} from "./AppDrawer.props";
import {useContext, useState} from "react";
import {AccountCircle, ExpandLess} from "@mui/icons-material";
import {Collapse, ListItemButton, ListSubheader, Menu, MenuItem} from "@mui/material";
import Link from 'next/link';
import Button from '@mui/material/Button';
import {useRouter} from "next/router";
import {AppContext} from "../../../context";
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import PeopleIcon from '@mui/icons-material/People';
import AddIcon from '@mui/icons-material/Add';


const drawerWidth = 240;

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})<{
    open?: boolean;
}>(({theme, open}) => ({
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

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
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

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function AppDrawer({children, authorized = false}: AppDrawerProps) {
    const theme = useTheme();
    const router = useRouter();
    const {auth, setAuth} = useContext(AppContext);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [open, setOpen] = React.useState(true);
    const [collapseIsOpened, setCollapseIsOpened] = React.useState(false);

    const handleClick = () => {
        setCollapseIsOpened(!collapseIsOpened);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

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

    const getCurrentUser = () => {
        if (process.browser) {
            const user = JSON.parse( localStorage.getItem('user'));
            return user.username;
        }
        return null;
    };

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{mr: 2, ...(open && {display: 'none'})}}
                    >
                        <MenuIcon/>
                    </IconButton>

                    <img
                        src="https://dev.mai.ru/generic/images/logo/mai-web.svg"
                        alt="MAI"
                        loading="lazy"
                        width="40px"
                        onClick={() => router.push('/')}
                        style={{cursor: 'pointer'}}
                    />

                    <Typography
                        style={{cursor: 'pointer'}}
                        onClick={() => router.push('/')}
                        sx={{flexGrow: 1}}
                        variant={"h6"}
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
                                    <AccountCircle/>
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
                        )
                        :
                        (
                            <Link href={`/login`}>
                                <Button color={"white"} variant="outlined">Войти</Button>
                            </Link>
                        )}

                </Toolbar>
            </AppBar>
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
                    <Typography sx={{flexGrow: 1, fontWeight: "500"}} variant={"h5"}>
                        Меню
                    </Typography>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <List>

                    {auth &&
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
                            {/*<ListItemButton>*/}
                            {/*    <ListItemIcon>*/}
                            {/*        <SendIcon />*/}
                            {/*    </ListItemIcon>*/}
                            {/*    <ListItemText primary="Sent mail" />*/}
                            {/*</ListItemButton>*/}
                            {/*<ListItemButton>*/}
                            {/*    <ListItemIcon>*/}
                            {/*        <DraftsIcon />*/}
                            {/*    </ListItemIcon>*/}
                            {/*    <ListItemText primary="Drafts" />*/}
                            {/*</ListItemButton>*/}
                            <ListItemButton onClick={handleClick}>
                                <ListItemIcon>
                                    <PeopleIcon />
                                </ListItemIcon>
                                <ListItemText primary="Сотрудники" />
                                {collapseIsOpened ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={collapseIsOpened} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton onClick={() => router.push('/member/create')} sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <AddIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Добавить сотрудника" />
                                    </ListItemButton>
                                </List>
                            </Collapse>
                        </List>
                    }

                </List>
                <Divider/>
            </Drawer>
            <Main open={open}>
                <DrawerHeader/>
                {children}
            </Main>
        </Box>
    );
}