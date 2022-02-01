import { TheProfileAddingPublicationsProps } from './TheProfileAddingPublications.props';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import * as React from 'react';
import { Card, CardActions, CardContent, Grid, Input } from '@mui/material';
import { useForm } from 'react-hook-form';
import { AppFormErrorMessage } from '../AppFormErrorMessage/AppFormErrorMessage';
import Button from '@mui/material/Button';
import PublicationsService from '../../../service/publications/publications.service';
import { useRouter } from 'next/router';

export const TheProfileAddingPublications = ({
  auth,
  adding,
  setAdding,
  errors,
  setErrors,
  member,
  ...props
}: TheProfileAddingPublicationsProps): JSX.Element => {
  const publicationsService = new PublicationsService();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();

  const onSubmit = handleSubmit((data) =>
    publicationsService
      .create(data, member.id)
      .then((publication) => console.log(publication, 'created'))
      .then(() => router.push(`/`))
      .catch((e) => setErrors([...errors, e])),
  );

  if (auth) {
    return (
      <Card variant={'outlined'} {...props}>
        <CardActions>
          <IconButton onClick={() => setAdding(!adding)}>
            {adding ? <CloseIcon /> : <AddIcon />}
          </IconButton>
        </CardActions>
        {adding && (
          <CardContent>
            <form onSubmit={onSubmit}>
              <Grid gap={2} container justifyContent="flex-start">
                <Grid item>
                  <Input
                    placeholder="Название"
                    {...register('title', { required: true })}
                  />
                  {formErrors.title && (
                    <AppFormErrorMessage text="Это поле обязательно к заполнению" />
                  )}
                </Grid>
                <Grid item>
                  <Input
                    placeholder="Где опубликовано"
                    {...register('published', { required: true })}
                  />
                  {formErrors.published && (
                    <AppFormErrorMessage text="Это поле обязательно к заполнению" />
                  )}
                </Grid>

                <Grid item>
                  <Input
                    placeholder="Авторы"
                    {...register('body', { required: true })}
                  />
                  {formErrors.body && (
                    <AppFormErrorMessage text="Это поле обязательно к заполнению" />
                  )}
                </Grid>
                <Grid item>
                  <Button variant={'outlined'} type="submit">
                    Добавить публикацию
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        )}
      </Card>
    );
  } else return null;
};
