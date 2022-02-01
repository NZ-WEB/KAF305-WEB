import { AppPublicationCardProps } from './AppPublicationCard.props';
import {
  Card,
  CardContent,
  CardHeader,
  Input,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import PublicationsService from "../../../service/publications/publications.service";
import {PublicationInterface} from "../../../interfaces/publication.interface";

export const AppPublicationCard = ({
  publication,
  auth = false,
  errors,
  setErrors,
  ...props
}: AppPublicationCardProps): JSX.Element => {
  const publicationService = new PublicationsService();
  const [publicationState, setPublicationsState] = useState<PublicationInterface>(publication);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();

  const onSubmit = handleSubmit((data) =>
    publicationService
      .update(data, publication.slug)
      .then((updatedPublication: PublicationInterface) =>
        setPublicationsState(updatedPublication),
      )
      .then(() => setIsEditing(!isEditing))
      .catch((e) => setErrors([...errors, e.message])),
  );

  return (
    <Card {...props}>
      <form onSubmit={onSubmit}>
        {auth && (
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
                <IconButton onClick={() => setIsEditing(!isEditing)}>
                  <EditIcon />
                </IconButton>
              </>
            }
          />
        )}
        <CardContent>
          {isEditing ? (
            <Input placeholder="Основной текст" defaultValue={publicationState.body} {...register('body')} />
          ) : (
            <Typography variant={'subtitle1'}>{publicationState.body}</Typography>
          )}
        </CardContent>
      </form>
    </Card>
  );
};
