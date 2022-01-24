import {Avatar, Card, CardContent, CardHeader, Skeleton} from "@mui/material";
import {withLayout} from "../../layout/Layout";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import Typography from "@mui/material/Typography";
import {red} from "@mui/material/colors";
import {useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import MembersService from "../../service/members/members.service";
import {MembersInterface} from "../../interfaces/members.interface";
import {AppContext} from "../../context";

const MemberPage = (): JSX.Element => {
    const [member, setMember] = useState<null | MembersInterface>(null);
    const [errors, setErrors] = useState([]);
    const router = useRouter();
    const membersService = new MembersService();
    const {auth} = useContext(AppContext);
    const slug = router.query.slug?.toString();

    useEffect(() => {
        if (process.browser && slug) {
            membersService.getBySlug(slug)
                .then((member) => setMember(member))
                .catch((e) => setErrors([...errors, e]));
        }
    }, [slug]);

    return member
        ?
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
                    <IconButton aria-label="settings">
                        <EditIcon/>
                    </IconButton>
                }
                title={member.fullName}
                subheader={member.post}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    Образование: {member.qualification}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Преподаваемые предметы: {member.education}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Преподаваемые предметы: {member.disciplines}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Преподаваемые предметы: {member.academicDegree}
                </Typography>
            </CardContent>
        </Card>
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