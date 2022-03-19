import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AppNewsProps } from './AppNews.props';
import CircularProgress from '@mui/material/CircularProgress';
import { NewsInterface } from '../../../interfaces/News.interface';
import { AccordionActions } from '@mui/material';
import { AppModal } from '../AppModal/AppModal';
import { useContext } from 'react';
import { AppContext } from '../../../context';

export const AppNews = ({ news, deleteNews }: AppNewsProps): JSX.Element => {
  const { auth } = useContext(AppContext);
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
      <Typography variant="h6">Новости</Typography>
      {news.length ? (
        news.map((newsItem: NewsInterface) => (
          <Accordion
            elevation={0}
            key={newsItem.id}
            expanded={expanded === `panel${newsItem.id}`}
            onChange={handleChange(`panel${newsItem.id}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                {newsItem.title}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                {newsItem.subtitle}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{newsItem.description}</Typography>
            </AccordionDetails>
            {auth && (
              <AccordionActions>
                <AppModal
                  icon
                  withButton
                  btnText="Удалить"
                  title="Вы действительно хотите удалить эту новость"
                  subtitle="После удаления данное действие невозможно отменить"
                  handle={() => deleteNews(newsItem.id)}
                />
              </AccordionActions>
            )}
          </Accordion>
        ))
      ) : (
        <CircularProgress />
      )}
    </>
  );
};
