import * as React from 'react';
import type {NextPage} from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {withLayout} from "../layout/Layout";
import {useEffect, useState} from "react";
import MembersService from "../service/members/members.service";
import {MembersInterface} from "../interfaces/members.interface";
import {Alert} from "@mui/material";

const Home: NextPage = () => {
    const [errors, setErrors] = useState([]);
    const [members, setMembers] = useState<[] | MembersInterface[]>([]);
    const membersService = new MembersService();

    const getMembersList = () => {
        membersService.getAll()
            .then((membersList) => setMembers(membersList))
            .catch((e) => setErrors([...errors, e.data]));
    };

    useEffect(() => {
        getMembersList();
    }, []);

    return (
        <Container>
            {/*Displaying errors*/}
            {errors.length > 0 && errors.map((error) => <Alert severity="error">{error.message}</Alert>)}

            <Typography gutterBottom variant={"h3"} sx={{fontWeight: "bold"}}>
                Кафедра 305
            </Typography>

            <Typography variant={"h4"} sx={{fontWeight: "medium"}}>
                Пилотажно-навигационные и информационно-измерительные комплексы
            </Typography>

            {/*Displaying members*/}
            {members &&
                members.map(member => (
                    <div>
                        <p>{member.fullName}</p>
                        <p>{member.post}</p>
                        <p>{member.disciplines}</p>
                        <p>{member.education}</p>
                        <p>{member.qualification}</p>
                    </div>
                ))
            }
        </Container>
    );
};

export default withLayout(Home);
