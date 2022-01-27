import * as React from 'react';
import type {NextPage} from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {withLayout} from "../layout/Layout";
import {useEffect, useState} from "react";
import MembersService from "../service/members/members.service";
import {MembersInterface} from "../interfaces/members.interface";
import {Alert, Button, Card, CardActions, CardContent} from "@mui/material";
import {router} from "next/client";
import {useRouter} from "next/router";
import {AppTable, CustomCurd} from "../src/components";
import styles from './index.module.css';

const Home: NextPage = () => {
    const [errors, setErrors] = useState([]);
    const [members, setMembers] = useState<[] | MembersInterface[]>([]);
    const membersService = new MembersService();
    const router = useRouter();

    const getMembersList = () => {
        membersService.getAll()
            .then((membersList) => setMembers(membersList))
            .catch((e) => setErrors([...errors, e.data]));
    };

    useEffect(() => {
        getMembersList();
    }, []);

    return (
        <CustomCurd>
            {/*Displaying errors*/}
            {errors.length > 0 && errors.map((error) => <Alert severity="error">{error.message}</Alert>)}


            {/*Displaying members*/}
            {/*{members &&*/}
            {/*    members.map(member => (*/}
            {/*        <Card  key={member.id}>*/}
            {/*            <CardContent>*/}
            {/*                <Typography variant={"h5"} >{member.fullName}</Typography>*/}
            {/*                <Typography variant={"h6"} >Должность: {member.post}</Typography>*/}
            {/*                <Typography variant={"caption"} >Дисциплины: {member.disciplines}</Typography>*/}
            {/*                <Typography variant={"caption"} >{member.education}</Typography>*/}
            {/*                <Typography variant={"caption"} > {member.qualification}</Typography>*/}
            {/*            </CardContent>*/}
            {/*            <CardActions>*/}
            {/*                <Button onClick={() => router.push(`/member/${member.slug}`)} size="small">Learn More</Button>*/}
            {/*            </CardActions>*/}
            {/*        </Card>*/}
            {/*        */}

            {/*    ))*/}
            {/*}*/}

            <AppTable members={members} />
        </CustomCurd>
    );
};

export default withLayout(Home);
