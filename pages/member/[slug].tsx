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
import {AppMemberInfoField} from "../../src/components/AppMemberInfoField/AppMemberInfoField";

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
        .then(member => console.log(member, 'new member'))
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
                        <AppMemberInfoField data={member.disciplines} title={"Преподаваемые предметы"} editing={editing} register={() => register("disciplines")} registerField={"disciplines"}/>
                        <AppMemberInfoField data={member.education} title={"Образование"} editing={editing} register={() => register("education")} registerField={"education"}/>
                        <AppMemberInfoField data={member.qualification} title={"Должность"} editing={editing} register={() => register("qualification")} registerField={"qualification"}/>
                        <AppMemberInfoField data={member.academicDegree} title={"Кандидатская степень"} editing={editing} register={() => register("academicDegree")} registerField={"academicDegree"}/>
                        <AppMemberInfoField data={member.specialties} title={"Специализации"} editing={editing} register={() => register("specialties")} registerField={"specialties"}/>
                        <AppMemberInfoField data={member.totalGuardian} title={"Рабочий стаж"} editing={editing} register={() => register("totalGuardian")} registerField={"totalGuardian"}/>
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