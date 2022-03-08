import { TheProfileAddingPublicationsProps } from './TheProfileAddingPublications.props';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import * as React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { AppFormErrorMessage } from '../AppFormErrorMessage/AppFormErrorMessage';
import Button from '@mui/material/Button';
import PublicationsService from '../../../service/publications/publications.service';
import { PublicationInterface } from '../../../interfaces/publication.interface';

export const TheProfileAddingPublications = ({
  auth,
  adding,
  setAdding,
  errors,
  setErrors,
  member,
  setPublications,
  ...props
}: TheProfileAddingPublicationsProps): JSX.Element => {
  const publicationsService = new PublicationsService();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();

  const onSubmit = handleSubmit((data: PublicationInterface) =>
    publicationsService
      .create(data, member.id)
      .then(() => setPublications(data))
      .catch((e) => setErrors([...errors, e])),
  );

  if (auth) {
    return (
      <Card variant={'outlined'} {...props}>
        <CardActions>
          <IconButton onClick={() => setAdding(!adding)}>
            {adding ? <CloseIcon /> : <AddIcon />}
          </IconButton>
          <Typography variant="subtitle1">Добавить публикацию</Typography>
        </CardActions>
        {adding && (
          <CardContent>
            <form onSubmit={onSubmit}>
              <TextField
                margin="dense"
                fullWidth
                placeholder="Название"
                {...register('title', { required: true })}
              />
              {formErrors.title && (
                <AppFormErrorMessage text="Это поле обязательно к заполнению" />
              )}
              <TextField
                margin="dense"
                fullWidth
                placeholder="Где опубликовано"
                {...register('published', { required: true })}
              />
              {formErrors.published && (
                <AppFormErrorMessage text="Это поле обязательно к заполнению" />
              )}

              <TextField
                multiline
                rows={4}
                margin="dense"
                fullWidth
                placeholder="Авторы"
                {...register('body', { required: true })}
              />
              {formErrors.body && (
                <AppFormErrorMessage text="Это поле обязательно к заполнению" />
              )}
              <Button
                sx={{ marginTop: '0.5em' }}
                fullWidth
                variant="contained"
                type="submit"
              >
                Добавить публикацию
              </Button>
            </form>
          </CardContent>
        )}
      </Card>
    );
  } else return null;
};
