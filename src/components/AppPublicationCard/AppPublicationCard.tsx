import { AppPublicationCardProps } from './AppPublicationCard.props';
import { CardContent, CardActions, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import PublicationsService from '../../../service/publications/publications.service';
import { PublicationInterface } from '../../../interfaces/publication.interface';
import { AppModal } from '../AppModal/AppModal';
import * as React from 'react';
import { AppCard } from '../AppCard/AppCard';
import EditOffIcon from '@mui/icons-material/EditOff';

export const AppPublicationCard = ({
  publication,
  auth,
  errors,
  setErrors,
  setPublications,
  setDeletePublication,
  ...props
}: AppPublicationCardProps): JSX.Element => {
  const publicationService = new PublicationsService();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit((data) =>
    publicationService
      .update(data, publication.slug)
      .then((updatedPublication: PublicationInterface) => {
        setPublications(updatedPublication);
      })
      .then(() => setIsEditing(!isEditing))
      .catch((e) => setErrors([...errors, e.message])),
  );

  const deletePublication = () => {
    publicationService
      .delete(publication.slug)
      .then(() => setDeletePublication(publication))
      .catch((e) => setErrors([...errors, e]));
  };

  return (
    <AppCard {...props}>
      <form onSubmit={onSubmit}>
        <CardContent>
          {isEditing ? (
            <TextField
              fullWidth
              margin="dense"
              defaultValue={publication.title}
              placeholder="Название"
              {...register('title')}
            />
          ) : (
            <Typography variant={'subtitle2'}>{publication.title}</Typography>
          )}

          {isEditing ? (
            <TextField
              fullWidth
              margin="dense"
              defaultValue={publication.published}
              placeholder="Опубликовано в..."
              {...register('published')}
            />
          ) : (
            <Typography variant={'subtitle1'}>
              {publication.published}
            </Typography>
          )}

          {isEditing ? (
            <TextField
              fullWidth
              multiline
              rows={4}
              margin="dense"
              placeholder="Основной текст"
              defaultValue={publication.body}
              {...register('body')}
            />
          ) : (
            <Typography variant={'body1'}>{publication.body}</Typography>
          )}

          {isEditing && (
            <Button
              fullWidth
              type="submit"
              sx={{ marginTop: '0.5em' }}
              variant={'outlined'}
            >
              Сохранить
            </Button>
          )}
        </CardContent>

        <CardActions>
          {auth && (
            <IconButton onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? <EditOffIcon /> : <EditIcon />}
            </IconButton>
          )}

          {auth && (
            <AppModal
              icon
              handle={() => deletePublication()}
              withButton={true}
              btnText={'Удалить'}
              title={'Вы действительно хотите удалить публикацию'}
              subtitle={
                'после подтверждения, это действие не возможно отменить'
              }
            />
          )}
        </CardActions>
      </form>
    </AppCard>
  );
};
