import { AppPublicationCardProps } from './AppPublicationCard.props';
import {
  Card,
  CardActions,
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

export const AppPublicationCard = ({
  publication,
  auth = false,
  ...props
}: AppPublicationCardProps): JSX.Element => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <Card {...props}>
      <form onSubmit={onSubmit}>
        {auth && (
          <CardHeader
            title={
              isEditing ? (
                <Input
                  defaultValue={publication.title}
                  placeholder="Название"
                  {...register('title')}
                />
              ) : (
                <Typography variant={'subtitle2'}>
                  {publication.title}
                </Typography>
              )
            }
            subheader={
              isEditing ? (
                <Input
                  defaultValue={publication.published}
                  placeholder="Опубликовано в..."
                  {...register('published')}
                />
              ) : (
                <Typography variant={'subtitle1'}>
                  {publication.published}
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
            <Input placeholder="Основной текст" defaultValue={publication.body} {...register('body')} />
          ) : (
            <Typography variant={'subtitle1'}>{publication.body}</Typography>
          )}
        </CardContent>
      </form>
    </Card>
  );
};
