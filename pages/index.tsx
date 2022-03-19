import * as React from 'react';
import type { NextPage } from 'next';
import { withLayout } from '../layout/Layout';
import { useEffect, useState } from 'react';
import MembersService from '../service/members/members.service';
import { MembersInterface } from '../interfaces/members.interface';
import { CardMedia, Grid } from '@mui/material';
import { AppPageTitle } from '../src/components/AppPageTitle/AppPageTitle';
import { AppErrors } from '../src/components/AppErrors/AppErrors';
import { TheHomePageNews } from '../src/components/TheHomePageNews/TheHomePageNews';
import { TheMembersList } from '../src/components/TheMembersList/TheMembersList';
import { AppCard } from '../src/components/AppCard/AppCard';
import { AppNews } from '../src/components';
import { NewsInterface } from '../interfaces/News.interface';
import NewsService from '../service/news/news.service';

const Home: NextPage = () => {
  const membersService = new MembersService();
  const newsService = new NewsService();

  const [errors, setErrors] = useState([]);
  const [members, setMembers] = useState<[] | MembersInterface[]>([]);
  const [news, setNews] = useState<NewsInterface[]>([]);

  const getMembersList = () => {
    membersService
      .getAll()
      .then((membersList) => setMembers(membersList))
      .catch((e) => setErrors([...errors, e.data]));
  };

  const getAllNews = () => {
    newsService
      .getAll()
      .then((newsList) => setNews(newsList))
      .catch((e) => setErrors([...errors, e]));
  };

  useEffect(() => {
    getMembersList();
    getAllNews();
  }, []);

  const handleDeleteNews = (id: number) => {
    newsService
      .deleteById(id)
      .then(() => setNews([...news].filter((news) => news.id !== id)))
      .catch();
  };

  return (
    <Grid container spacing={2} gap={1}>
      {errors.length > 0 && (
        <Grid item xs={12}>
          <AppErrors errors={errors} />
        </Grid>
      )}

      <Grid item xs={12}>
        <AppPageTitle
          title="Кафедра 305"
          description="«Пилотажно-навигационные и информационно-измерительные комплексы»"
        />
      </Grid>

      <Grid item xs={12}>
        <AppCard>
          <CardMedia
            component="img"
            image="https://images.unsplash.com/photo-1580894908361-967195033215?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="Paella dish"
          />
        </AppCard>
      </Grid>

      <Grid item xs={12}>
        <AppNews deleteNews={handleDeleteNews} news={news} />
      </Grid>

      <Grid item xs={12}>
        <TheHomePageNews />
      </Grid>

      <Grid item xs={12}>
        {members && <TheMembersList members={members} />}
      </Grid>
    </Grid>
  );
};

export default withLayout(Home);
