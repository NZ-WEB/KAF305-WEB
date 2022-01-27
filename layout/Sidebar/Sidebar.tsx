import {AppSidebarIcon, CustomCurd} from "../../src/components";
import {SidebarProps} from "./Sidebar.props";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import styles from './Sidebar.module.css';
import List from "@mui/material/List";
import {ListItemButton} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded';
import {useRouter} from "next/router";
import {MenuItemsContext} from "../../context";
import {AppDivider} from "../../src/components/AppDivider/AppDivider";

export const Sidebar = ({...props}: SidebarProps): JSX.Element => {
    const router = useRouter();
    const [selectedIndex, setSelectedIndex] = useState(0);


    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
        switch (index) {
            case 0:
                router.push('/', {},{shallow: true});
                break;
            case 1:
                router.push('/', {},{shallow: true});
                break;
            case 2:
                router.push('/member/create', {},{shallow: true});
                break;
            case 3:
                router.push('/');
                break;
            case 4:
                router.push('/');
                break;
            case 5:
                router.push('/registerSecr', {},{shallow: true});
                break;
        }
    };

    useEffect(() => {
        console.log('rerender')
    }, []);

    return (
        <CustomCurd {...props}>
            <Typography color="primary" sx={{
                margin: "10px auto 30px",
                textAlign: "center",
                fontSize: "14px",
                lineHeight: "100%",
                letterSpacing: "0.18em"
            }}>
                Меню
            </Typography>

            <AppDivider/>

            <List component="nav" sx={{marginTop: "-8px"}}>
                <ListItemButton
                    sx={{
                        borderRadius: "15px",
                        marginBottom: ""
                    }}
                    selected={selectedIndex === 0}
                    onClick={
                        (event) => handleListItemClick(event, 0)
                    }
                >
                    <AppSidebarIcon active={selectedIndex === 0 ? true : false}>
                        <HomeRoundedIcon color={selectedIndex === 0 ? "primary" : "action"} sx={{
                            width: "15px",
                            height: "15px",
                        }} />
                    </AppSidebarIcon>
                    <Typography color="primary" sx={{
                        marginLeft: '15px',
                        fontSize: "14px",
                        lineHeight: "100%"
                    }}>
                        Главная
                    </Typography>
                </ListItemButton>
                <ListItemButton
                    sx={{
                        borderRadius: "15px"
                    }}
                    selected={selectedIndex === 1}
                    onClick={
                        (event) => handleListItemClick(event, 1)
                    }
                >
                    <AppSidebarIcon active={selectedIndex === 1 ? true : false}>
                        <GroupRoundedIcon color={selectedIndex === 1 ? "primary" : "action"} sx={{
                            width: "15px",
                            height: "15px"
                        }}/>
                    </AppSidebarIcon>
                    <Typography color="primary" sx={{
                        marginLeft: '15px',
                        fontSize: "14px",
                        lineHeight: "100%"
                    }}>
                        Сотрудники
                    </Typography>
                </ListItemButton>
                <ListItemButton
                    sx={{
                        borderRadius: "15px"
                    }}
                    selected={selectedIndex === 2}
                    onClick={
                        (event) => handleListItemClick(event, 2)
                    }
                >
                    <AppSidebarIcon active={selectedIndex === 2 ? true : false}>
                        <PersonAddAlt1RoundedIcon color={selectedIndex === 2 ? "primary" : "action"} sx={{
                            width: "15px",
                            height: "15px"
                        }} />
                    </AppSidebarIcon>
                    <Typography color="primary" sx={{
                        marginLeft: '15px',
                        fontSize: "14px",
                        lineHeight: "100%"
                    }}>
                        Добавить сотрудника
                    </Typography>
                </ListItemButton>
            </List>

            <Typography marginTop="12px" fontWeight={"bold"} fontSize={"12px"}>
                Страницы аккаунта
            </Typography>

            <List component="nav">
                <ListItemButton
                    sx={{
                        borderRadius: "15px",
                        marginBottom: ""
                    }}
                    selected={selectedIndex === 3}
                    onClick={
                        (event) =>
                            handleListItemClick(event, 3)
                    }
                >
                    <AppSidebarIcon active={selectedIndex === 3 ? true : false}>
                        <AccountBoxRoundedIcon color={selectedIndex === 3 ? "primary" : "action"} sx={{
                            width: "15px",
                            height: "15px",
                        }} />
                    </AppSidebarIcon>
                    <Typography color="primary" sx={{
                        marginLeft: '15px',
                        fontSize: "14px",
                        lineHeight: "100%"
                    }}>
                        Профиль
                    </Typography>
                </ListItemButton>
                <ListItemButton
                    sx={{
                        borderRadius: "15px"
                    }}
                    selected={selectedIndex === 4}
                    onClick={
                        (event) =>
                            handleListItemClick(event, 4)
                    }
                >
                    <AppSidebarIcon active={selectedIndex === 4 ? true : false}>
                        <ManageAccountsRoundedIcon color={selectedIndex === 4 ? "primary" : "action"} sx={{
                            width: "15px",
                            height: "15px"
                        }}/>
                    </AppSidebarIcon>
                    <Typography color="primary" sx={{
                        marginLeft: '15px',
                        fontSize: "14px",
                        lineHeight: "100%"
                    }}>
                        Редактировать профиль
                    </Typography>
                </ListItemButton>
                <ListItemButton
                    sx={{
                        borderRadius: "15px"
                    }}
                    selected={selectedIndex === 5}
                    onClick={
                        (event) =>
                            handleListItemClick(event, 5)
                    }
                >
                    <AppSidebarIcon active={selectedIndex === 5 ? true : false}>
                        <GroupAddRoundedIcon color={selectedIndex === 5 ? "primary" : "action"} sx={{
                            width: "15px",
                            height: "15px"
                        }} />
                    </AppSidebarIcon>
                    <Typography color="primary" sx={{
                        marginLeft: '15px',
                        fontSize: "14px",
                        lineHeight: "100%"
                    }}>
                        Регистрация
                    </Typography>
                </ListItemButton>
            </List>

        </CustomCurd>
    );
}