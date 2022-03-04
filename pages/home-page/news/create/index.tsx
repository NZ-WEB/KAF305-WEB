import { withLayout } from '../../../../layout/Layout';
import {
  Alert,
  Breadcrumbs,
  Button,
  Grid,
  Link,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import HomePageNewsService from '../../../../service/homePage/news/HomePageNews.service';
import { HomePageNewsInterface } from '../../../../interfaces/HomePageNews.interface';
import { useState } from 'react';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import { AppCard } from '../../../../src/components/AppCard/AppCard';

const CreatePage = (): JSX.Element => {
  const homePageNewsService = new HomePageNewsService();
  const [errors, setErrors] = useState([]);
  const [isNewsAdded, setIsNewsAdded] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();

  const onSubmit = handleSubmit((data: HomePageNewsInterface) =>
    homePageNewsService
      .create(data)
      .then(() => {
        setIsNewsAdded(!isNewsAdded);
        setTimeout(() => {
          setIsNewsAdded(false);
        }, 3000);
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
        <Alert severity="success">Запись успешно добавлена</Alert>
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
                fullWidth
                id="text"
                label="Текст"
                multiline
                rows={3}
                defaultValue="Default Value"
                {...register('text', { required: true })}
              />
              {formErrors.text && (
                <Alert severity="error">
                  <span>Поле "текст" обязательно к заполнению</span>
                </Alert>
              )}
            </Grid>
            <Grid item md={4} xs={12}>
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

export default withLayout(CreatePage);
