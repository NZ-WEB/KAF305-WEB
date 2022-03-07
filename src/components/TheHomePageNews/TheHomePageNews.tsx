import { Grid } from '@mui/material';
import { TheHomePageNewsProps } from './TheHomePageNews.props';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useContext, useEffect, useState } from 'react';
import HomePageNewsService from '../../../service/homePage/news/HomePageNews.service';
import Typography from '@mui/material/Typography';
import { AppModal } from '../AppModal/AppModal';
import { HomePageNewsInterface } from '../../../interfaces/HomePageNews.interface';
import { AppContext } from '../../../context';
import Box from '@mui/material/Box';

export const TheHomePageNews = ({}: TheHomePageNewsProps): JSX.Element => {
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
        setSlideCount(0);
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
    <>
      <div>
        {news.length && (
          <Grid container gap={1} direction="column">
            <Grid item>
              <Typography variant={'h6'}>{news[slideCount].title}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">{news[slideCount].text}</Typography>
            </Grid>
          </Grid>
        )}
      </div>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '1em',
        }}
      >
        <div>
          <IconButton onClick={() => setNewConditionOfSlide('dec')}>
            <ArrowBackIcon />
          </IconButton>

          <IconButton onClick={() => setNewConditionOfSlide('inc')}>
            <ArrowForwardIcon />
          </IconButton>
        </div>

        {auth && (
          <AppModal
            btnText="Удалить"
            title="Вы действительно хотите удалить эту новость?"
            subtitle="Это действие нельзя будет отменить"
            handle={() => deleteNews(news[slideCount])}
            withButton
            icon
          />
        )}
      </Box>
    </>
  );
};
