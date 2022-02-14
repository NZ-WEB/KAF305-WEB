import { Card } from '@mui/material';
import { TheHomePageNewsProps } from './TheHomePageNews.props';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useEffect, useState } from 'react';
import HomePageNewsService from '../../../service/homePage/news/HomePageNews.service';
import Typography from '@mui/material/Typography';

export const TheHomePageNews = ({
  ...props
}: TheHomePageNewsProps): JSX.Element => {
  const newsService = new HomePageNewsService();
  const [slideCount, setSlideCount] = useState<number>(0);
  const [news, setNews] = useState([]);

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

  useEffect(() => {
    newsService
      .getAll()
      .then((news) => setNews(news))
      .then((i) => console.log(i, 'i'))
      .catch((e) => console.log(e));
  }, []);

  return (
    <Card {...props}>
      <IconButton onClick={() => setNewConditionOfSlide('dec')}>
        <ArrowBackIcon />
      </IconButton>
      <div>
        {news.length && (
          <div>
            <Typography>{news[slideCount].title}</Typography>
          </div>
        )}
      </div>

      <IconButton onClick={() => setNewConditionOfSlide('inc')}>
        <ArrowForwardIcon />
      </IconButton>
    </Card>
  );
};
