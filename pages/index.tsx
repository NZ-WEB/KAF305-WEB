import * as React from 'react';
import type {NextPage} from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../src/Link';
import ProTip from '../src/ProTip';
import Copyright from '../src/Copyright';
import {withLayout} from "../layout/Layout";

const Home: NextPage = () => {
    return (
        <Container>
            <Typography gutterBottom variant={"h3"} sx={{fontWeight: "bold"}}>
                Кафедра 305
            </Typography>

            <Typography variant={"h4"} sx={{fontWeight: "medium"}}>
                Пилотажно-навигационные и информационно-измерительные комплексы
            </Typography>

        </Container>
    );
};

export default withLayout(Home);
