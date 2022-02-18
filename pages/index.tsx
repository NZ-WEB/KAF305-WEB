import * as React from 'react';
import type { NextPage } from 'next';
import { withLayout } from '../layout/Layout';
import { useEffect, useState } from 'react';
import MembersService from '../service/members/members.service';
import { MembersInterface } from '../interfaces/members.interface';
import { Grid } from '@mui/material';
import { TheMembersTable } from '../src/components/TheMembersTable/TheMembersTable';
import { AppPageTitle } from '../src/components/AppPageTitle/AppPageTitle';
import { AppErrors } from '../src/components/AppErrors/AppErrors';
import { TheHomePageNews } from '../src/components/TheHomePageNews/TheHomePageNews';

const Home: NextPage = () => {
  const [errors, setErrors] = useState([]);
  const [members, setMembers] = useState<[] | MembersInterface[]>([]);
  const membersService = new MembersService();

  const getMembersList = () => {
    membersService
      .getAll()
      .then((membersList) => setMembers(membersList))
      .catch((e) => setErrors([...errors, e.data]));
  };

  useEffect(() => {
    getMembersList();
  }, []);

  return (
    <Grid container spacing={2} gap={1}>
      <Grid item xs={12}>
        {errors.length > 0 && <AppErrors errors={errors} />}
      </Grid>

      <Grid item xs={12}>
        <AppPageTitle
          title="Кафедра 305"
          description="«Пилотажно-навигационные и информационно-измерительные комплексы»"
        />
      </Grid>

      <Grid item xs={5}>
        <TheHomePageNews />
      </Grid>

      <Grid item xs={6}>
        {members && <TheMembersTable members={members} />}
      </Grid>
    </Grid>
  );
};

export default withLayout(Home);
