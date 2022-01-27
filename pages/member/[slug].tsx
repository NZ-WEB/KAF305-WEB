import {Alert, Avatar, Button, Card, CardContent, CardHeader, Menu, MenuItem, Skeleton} from "@mui/material";
import {withLayout} from "../../layout/Layout";
import IconButton from "@mui/material/IconButton";
import {useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import MembersService from "../../service/members/members.service";
import {MembersInterface} from "../../interfaces/members.interface";
import {AppContext} from "../../context";
import {useForm} from 'react-hook-form';
import * as React from "react";
import {AppButton, AppMemberInfoField, AppMembersAvatar, AppModal, CustomCurd} from "../../src/components";
import MoreIcon from '@mui/icons-material/MoreVert';
import styles from "./create/slug.module.css";
import Typography from "@mui/material/Typography";
import {AppDivider} from "../../src/components/AppDivider/AppDivider";
import {TheProfileInfo} from "../../src/components/TheProfileInfo/TheProfileInfo";

const MemberPage = (): JSX.Element => {
    const {auth: authContext} = useContext(AppContext);
    const [member, setMember] = useState<null | MembersInterface>(null);
    const [errors, setErrors] = useState([]);
    const [editing, setEditing] = useState<boolean>(false);
    const {auth} = useContext(AppContext);
    const router = useRouter();
    const membersService = new MembersService();
    const slug = router.query.slug?.toString();
    const {register, handleSubmit, formState: {errors: formErrors}} = useForm();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);


    useEffect(() => {
        if (process.browser && slug) {
            membersService.getBySlug(slug)
                .then((member) => setMember(member))
                .catch((e) => setErrors([...errors, e]));
        }
    }, [slug]);


    const onSubmit = handleSubmit((data) => membersService.update(data, slug)
        .then((member) => setMember(member))
        .then(member => console.log(member, 'new member'))
        .then(() => setEditing(false))
        .catch((e) => setErrors([...errors, e]))
    );

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const deleteMember = () => {
        const slug = member.slug;
        membersService.delete(slug)
            .then((response) => console.log(response))
            .catch((e) => setErrors([...errors, e]));
        router.push('/');
    };

    return member
        ?
        <div>
            {errors.length > 0 && errors.map((error) => <Alert severity="error">{error.message}</Alert>)}
            <Card>
                <CardHeader
                    avatar={
                        member.avatar !== ''
                            ?
                            <AppMembersAvatar editing={editing} url={member.avatar} register={() => register("avatar")}
                                              registerTitle={"avatar"}/>
                            :
                            <AppMembersAvatar editing={editing} url={member.avatar} register={() => register("avatar")}
                                              registerTitle={"avatar"}/>
                    }
                    action={
                        auth &&
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <MoreIcon/>
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

                                <MenuItem onClick={() => setEditing(!editing)}>
                                    {editing ? "Отм. режим редактирования" : "Изменить"}
                                </MenuItem>
                                <MenuItem onClick={handleClose}><AppModal handle={() => deleteMember()}
                                                                          withButton={true} btnText={"Удалить"}
                                                                          title={"Вы действительно хотите удалить сотрудника"}
                                                                          subtitle={"после подтверждения, это действие не возможно отменить"}/></MenuItem>
                            </Menu>
                        </div>

                    }
                    title={member.fullName &&
                        (editing ? <label>Полное имя<input defaultValue={member.fullName}
                                                           type="text" {...register("fullName")}/></label> : member.fullName)
                    }
                    subheader={member.fullName &&
                        (editing ? <label>Должность<input defaultValue={member.post} type="text" {...register("post")}/></label> : member.post)
                    }
                />
                <CardContent>
                    <form onSubmit={onSubmit}>
                        <AppMemberInfoField data={member.disciplines} title={"Преподаваемые предметы"} editing={editing}
                                            register={() => register("disciplines")} registerField={"disciplines"}/>
                        <AppMemberInfoField data={member.education} title={"Образование"} editing={editing}
                                            register={() => register("education")} registerField={"education"}/>
                        <AppMemberInfoField data={member.qualification} title={"Должность"} editing={editing}
                                            register={() => register("qualification")} registerField={"qualification"}/>
                        <AppMemberInfoField data={member.academicDegree} title={"Кандидатская степень"}
                                            editing={editing} register={() => register("academicDegree")}
                                            registerField={"academicDegree"}/>
                        <AppMemberInfoField data={member.specialties} title={"Специализации"} editing={editing}
                                            register={() => register("specialties")} registerField={"specialties"}/>
                        <AppMemberInfoField data={member.totalGuardian} title={"Рабочий стаж"} editing={editing}
                                            register={() => register("totalGuardian")} registerField={"totalGuardian"}/>
                        {editing && <Button type="submit" variant="contained">Обновить данные</Button>}
                    </form>
                </CardContent>
            </Card>
            <CustomCurd>
                <div className={styles.cardHeader}>
                    <Avatar variant="rounded" sx={{borderRadius: "15px", width: "80px", height: "80px"}}>

                    </Avatar>
                    <div className={styles.cardHeaderText}>
                        <Typography color="primary" sx={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            lineHeight: "140%"
                        }}>
                            {member.fullName}
                        </Typography>
                        <Typography sx={{
                            fontSize: "14px",
                            fontWeight: "normal",
                            lineHeight: "150%",
                            color: "#A0AEC0"
                        }}>
                            {member.post}
                        </Typography>
                    </div>
                    <div className={styles.buttonGroup}>
                        <AppButton className={styles.buttonItem} filled={true}>
                            Изменить
                        </AppButton>
                        <AppButton className={styles.buttonItem} >
                            Удалить
                        </AppButton>
                    </div>
                </div>
            </CustomCurd>
            <TheProfileInfo member={member}/>
        </div>
        :
        (
            <>
                <Skeleton variant="text"/>
                <Skeleton variant="circular" width={40} height={40}/>
                <Skeleton variant="rectangular" width={210} height={118}/>
            </>
        );
};


export default withLayout(MemberPage);