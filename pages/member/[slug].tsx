import {Alert, Avatar, Button, Card, CardContent, CardHeader, Skeleton} from "@mui/material";
import {withLayout} from "../../layout/Layout";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import Typography from "@mui/material/Typography";
import {red} from "@mui/material/colors";
import {useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import MembersService from "../../service/members/members.service";
import {MembersInterface} from "../../interfaces/members.interface";
import {AppContext} from "../../context";
import {useForm} from 'react-hook-form';
import * as React from "react";

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

    useEffect(() => {
        if (process.browser && slug) {
            membersService.getBySlug(slug)
                .then((member) => setMember(member))
                .catch((e) => setErrors([...errors, e]));
        }
    }, [slug]);


    const onSubmit = handleSubmit((data) => membersService.update(data, slug)
        .then((member) => setMember(member))
        .then(member => console.log(member,'new member'))
        .then(() => setEditing(false))
        .catch((e) => setErrors([...errors, e]))
    );

    return member
        ?
        <div>
            {errors.length > 0 && errors.map((error) => <Alert severity="error">{error.message}</Alert>)}
            <Card>
                <CardHeader
                    avatar={
                        member.avatar !== ''
                            ?
                            <Avatar alt="Remy Sharp" src={member.avatar}/>
                            :
                            <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                                {member.fullName[0]}
                            </Avatar>
                    }
                    action={
                        auth &&
                        <IconButton onClick={() => setEditing(!editing)} aria-label="settings">
                            {editing ? <CloseIcon/> : <EditIcon/>}
                        </IconButton>

                    }
                    title={member.fullName}
                    subheader={member.post}
                />
                <CardContent>
                    <form onSubmit={onSubmit}>
                        { member.qualification && <Typography variant="body2" color="text.secondary">
                            Профиль: {editing ? <input
                            {...register("qualification")}
                            type="text"
                            defaultValue={member.qualification}
                        /> : member.qualification}
                        </Typography>}
                        {member.education && <Typography variant="body2" color="text.secondary">
                            Образование: {editing ?
                            <input
                                {...register("education")}
                                type="text"
                                defaultValue={member.education}
                            /> : member.education}
                        </Typography>}
                        {member.disciplines && <Typography variant="body2" color="text.secondary">
                            Преподаваемые предметы: {editing ?
                            <input
                                {...register("disciplines")}
                                type="text"
                                defaultValue={member.disciplines}
                            /> : member.disciplines}
                        </Typography>}
                        {member.academicDegree && <Typography variant="body2" color="text.secondary">
                            Учёная степень: {editing ?
                            <input
                                {...register("academicDegree")}
                                type="text"
                                defaultValue={member.academicDegree}
                            /> : member.academicDegree}
                        </Typography>}
                        {member.specialties && <Typography variant="body2" color="text.secondary">
                            Специализация: {editing ?
                            <input
                                {...register("specialties")}
                                type="text"
                                defaultValue={member.specialties}
                            /> : member.specialties}
                        </Typography>}
                        {member.totalGuardian && <Typography variant="body2" color="text.secondary">
                            Стаж работы: {editing ?
                            <input
                                {...register("totalGuardian")}
                                type="text"
                                defaultValue={member.totalGuardian}
                            /> : member.totalGuardian}
                        </Typography>}
                        {editing && <Button type="submit" variant="contained">Обновить данные</Button>}
                    </form>
                </CardContent>
            </Card>
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