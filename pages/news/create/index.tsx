import NewsService from '../../../service/news/news.service';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Alert,
  Breadcrumbs,
  Button,
  Grid,
  Link,
  TextField,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { NewsInterface } from '../../../interfaces/News.interface';
import { withLayout } from '../../../layout/Layout';
import { AppCard } from '../../../src/components';

const CreateNewsPage = (): JSX.Element => {
  const newsService = new NewsService();
  const [errors, setErrors] = useState([]);
  const [isNewsAdded, setIsNewsAdded] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();

  const onSubmit = handleSubmit((data: NewsInterface) =>
    newsService
      .create(data)
      .then(() => {
        setIsNewsAdded(!isNewsAdded);
      })
      .catch((e) => setErrors([...errors, ...e])),
  );

  return (
    <>
      <Breadcrumbs sx={{ paddingBottom: '1em' }} aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="/news">
          News
        </Link>
        <Typography color="text.primary">Create</Typography>
      </Breadcrumbs>

      {errors.length > 0 &&
        errors.map((error) => (
          <Alert key={error} severity="error">
            {error}
          </Alert>
        ))}

      {isNewsAdded && (
        <Alert severity="success">Новость успешно добавлена</Alert>
      )}

      <AppCard>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="icon"
                label="Иконка"
                variant="outlined"
                fullWidth
                {...register('icon')}
              />
              {formErrors.icon && (
                <Alert severity="error">
                  <span>Поле "Иконка" обязательно к заполнению</span>
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="title"
                label="Заголовок"
                variant="outlined"
                fullWidth
                {...register('title', { required: true })}
              />
              {formErrors.title && (
                <Alert severity="error">
                  <span>Поле "Заголовок" обязательно к заполнению</span>
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="subtitle"
                label="Подзаголовок"
                variant="outlined"
                fullWidth
                {...register('subtitle', { required: true })}
              />
              {formErrors.subtitle && (
                <Alert severity="error">
                  <span>Поле "Подзаголовок" обязательно к заполнению</span>
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                label="Описание"
                multiline
                rows={3}
                {...register('description', { required: true })}
              />
              {formErrors.description && (
                <Alert severity="error">
                  <span>Поле "Описание" обязательно к заполнению</span>
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained">
                Добавить новость
              </Button>
            </Grid>
          </Grid>
        </form>
      </AppCard>
    </>
  );
};

export default withLayout(CreateNewsPage);
