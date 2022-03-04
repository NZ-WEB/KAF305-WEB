import { AppPublicationCardProps } from './AppPublicationCard.props';
import { CardContent, CardHeader, Input } from '@mui/material';
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
import { useRouter } from 'next/router';
import { AppCard } from '../AppCard/AppCard';

export const AppPublicationCard = ({
  publication,
  auth = false,
  errors,
  setErrors,
  ...props
}: AppPublicationCardProps): JSX.Element => {
  const publicationService = new PublicationsService();
  const [publicationState, setPublicationsState] =
    useState<PublicationInterface>(publication);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit((data) =>
    publicationService
      .update(data, publication.slug)
      .then((updatedPublication: PublicationInterface) =>
        setPublicationsState(updatedPublication),
      )
      .then(() => setIsEditing(!isEditing))
      .catch((e) => setErrors([...errors, e.message])),
  );

  const deletePublication = () => {
    publicationService
      .delete(publicationState.slug)
      .then((res) => console.log(res, 'deleted'))
      .then(() => router.push(`/`))
      .catch((e) => setErrors([...errors, e]));
  };

  return (
    <AppCard {...props}>
      <form onSubmit={onSubmit}>
        <CardHeader
          title={
            isEditing ? (
              <Input
                defaultValue={publicationState.title}
                placeholder="Название"
                {...register('title')}
              />
            ) : (
              <Typography variant={'subtitle2'}>
                {publicationState.title}
              </Typography>
            )
          }
          subheader={
            isEditing ? (
              <Input
                defaultValue={publicationState.published}
                placeholder="Опубликовано в..."
                {...register('published')}
              />
            ) : (
              <Typography variant={'subtitle1'}>
                {publicationState.published}
              </Typography>
            )
          }
          action={
            <>
              {isEditing && (
                <Button
                  type="submit"
                  sx={{ marginRight: '10px' }}
                  variant={'outlined'}
                >
                  Сохранить
                </Button>
              )}
              {auth && (
                <IconButton onClick={() => setIsEditing(!isEditing)}>
                  <EditIcon />
                </IconButton>
              )}
              {auth && (
                <AppModal
                  handle={() => deletePublication()}
                  withButton={true}
                  btnText={'Удалить'}
                  title={'Вы действительно хотите удалить публикацию'}
                  subtitle={
                    'после подтверждения, это действие не возможно отменить'
                  }
                />
              )}
            </>
          }
        />
        <CardContent>
          {isEditing ? (
            <Input
              placeholder="Основной текст"
              defaultValue={publicationState.body}
              {...register('body')}
            />
          ) : (
            <Typography variant={'subtitle1'}>
              {publicationState.body}
            </Typography>
          )}
        </CardContent>
      </form>
    </AppCard>
  );
};
