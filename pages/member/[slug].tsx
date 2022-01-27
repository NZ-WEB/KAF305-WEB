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
import ProfileLayout from "../../layout/profile-layout/ProfileLayout";

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
           <ProfileLayout member={member}/>
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