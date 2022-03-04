import { CardActions, Grid } from '@mui/material';
import { TheHomePageNewsProps } from './TheHomePageNews.props';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useContext, useEffect, useState } from 'react';
import HomePageNewsService from '../../../service/homePage/news/HomePageNews.service';
import Typography from '@mui/material/Typography';
import { AppModal } from '../AppModal/AppModal';
import { HomePageNewsInterface } from '../../../interfaces/HomePageNews.interface';
import { AppCard } from '../AppCard/AppCard';
import { AppContext } from '../../../context';

export const TheHomePageNews = ({
  ...props
}: TheHomePageNewsProps): JSX.Element => {
  const newsService = new HomePageNewsService();
  const [slideCount, setSlideCount] = useState<number>(0);
  const [news, setNews] = useState([]);
  const { auth } = useContext(AppContext);

  const setNewConditionOfSlide = (action: 'inc' | 'dec') => {
    switch (action) {
      case 'inc':
        if (slideCount === news.length - 1) {
          setSlideCount(0);
        } else {
          setSlideCount(slideCount + 1);
        }
        break;
      case 'dec':
        if (slideCount === 0) {
          setSlideCount(news.length - 1);
        } else {
          setSlideCount(slideCount - 1);
        }
        break;
    }
  };

  const deleteNews = (newsData: HomePageNewsInterface) => {
    newsService
      .deleteById(newsData.id)
      .then(() => {
        setNews(news.filter((item) => item.id !== newsData.id));
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    newsService
      .getAll()
      .then((news) => setNews(news))
      .catch((e) => console.log(e));
  }, []);

  return (
    <AppCard {...props}>
      <Grid container>
        <Grid item sm={2}>
          <IconButton onClick={() => setNewConditionOfSlide('dec')}>
            <ArrowBackIcon />
          </IconButton>
        </Grid>
        <Grid item sm={2}>
          <IconButton onClick={() => setNewConditionOfSlide('inc')}>
            <ArrowForwardIcon />
          </IconButton>
        </Grid>
        <Grid item sm={12}>
          <div>
            {news.length && (
              <Grid padding={'1em'} container direction="column">
                <Grid item>
                  <Typography variant={'h6'}>
                    {news[slideCount].title}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>{news[slideCount].text}</Typography>
                </Grid>
              </Grid>
            )}
          </div>
        </Grid>
      </Grid>
      <CardActions>
        {auth && (
          <AppModal
            withButton
            btnText="Удалить"
            title="Вы действительно хотите удалить эту новость?"
            subtitle="Это действие нельзя будет отменить"
            handle={() => deleteNews(news[slideCount])}
          />
        )}
      </CardActions>
    </AppCard>
  );
};
