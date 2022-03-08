import { AppProfileCardProps } from './AppProfileCard.props';
import {
  Avatar,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import { AppModal } from '../AppModal/AppModal';
import * as React from 'react';
import { useContext, useState } from 'react';
import MembersService from '../../../service/members/members.service';
import { AppContext } from '../../../context';
import { useRouter } from 'next/router';
import { FieldValues, UnpackNestedValue, useForm } from 'react-hook-form';
import { AppMemberInfoField } from '../AppMemberInfoField/AppMemberInfoField';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { AppProfileExpanded } from '../AppProfileExpanded/AppProfileExpanded';
import { AppCard } from '../AppCard/AppCard';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import EditOffIcon from '@mui/icons-material/EditOff';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  console.log(expand);
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const AppProfileCard = ({
  member,
  setMember,
  errors,
  setErrors,
  ...props
}: AppProfileCardProps): JSX.Element => {
  const [editing, setEditing] = useState<boolean>(false);
  const { auth } = useContext(AppContext);
  const router = useRouter();
  const membersService = new MembersService();
  const slug = router.query.slug?.toString();
  const { register, handleSubmit } = useForm();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const onSubmit = handleSubmit((data: UnpackNestedValue<FieldValues>) =>
    membersService
      .update(data, slug)
      .then((member) => setMember(member))
      .then((member) => console.log(member, 'new member'))
      .then(() => setEditing(false))
      .catch((e) => setErrors([...errors, e])),
  );

  const deleteMember = () => {
    const slug = member.slug;
    membersService
      .delete(slug)
      .then((response) => console.log(response))
      .catch((e) => setErrors([...errors, e]));
    router.push('/');
  };

  return (
    <AppCard {...props}>
      <CardHeader
        avatar={
          member.avatar !== '' ? (
            <Avatar
              sx={{ width: '80px', height: '80px' }}
              alt="avatar"
              src={member.avatar}
            />
          ) : (
            <Avatar
              sx={{ width: '80px', height: '80px' }}
              alt="avatar"
              src={member.avatar}
            />
          )
        }
        title={
          member.fullName && (
            <Typography variant="h6">{member.fullName}</Typography>
          )
        }
        subheader={
          member.post && (
            <Typography variant="overline">{member.post}</Typography>
          )
        }
      />

      <Divider variant="fullWidth" />

      <CardContent sx={{ padding: '1em 0' }}>
        <form onSubmit={onSubmit}>
          {editing && (
            <>
              <TextField
                margin="dense"
                fullWidth
                id="fullName"
                label="Ф.И.О."
                variant="outlined"
                defaultValue={member.fullName}
                {...register('fullName')}
              />
              <TextField
                margin="dense"
                fullWidth
                id="fullName"
                label="Должность"
                variant="outlined"
                defaultValue={member.post}
                type="text"
                {...register('post')}
              />
              <TextField
                margin="dense"
                fullWidth
                id="avatar"
                label="Аватар"
                variant="outlined"
                defaultValue={member.avatar}
                type="text"
                {...register('avatar')}
              />
            </>
          )}

          <AppMemberInfoField
            data={member.disciplines}
            title={'Преподаваемые предметы'}
            editing={editing}
            register={() => register('disciplines')}
            registerField={'disciplines'}
          />
          <AppMemberInfoField
            data={member.education}
            title={'Образование'}
            editing={editing}
            register={() => register('education')}
            registerField={'education'}
          />
          <AppMemberInfoField
            data={member.qualification}
            title={'Должность'}
            editing={editing}
            register={() => register('qualification')}
            registerField={'qualification'}
          />
          <AppMemberInfoField
            data={member.academicDegree}
            title={'Кандидатская степень'}
            editing={editing}
            register={() => register('academicDegree')}
            registerField={'academicDegree'}
          />
          <AppMemberInfoField
            data={member.specialties}
            title={'Специализации'}
            editing={editing}
            register={() => register('specialties')}
            registerField={'specialties'}
          />
          <AppMemberInfoField
            data={member.totalGuardian}
            title={'Рабочий стаж'}
            editing={editing}
            register={() => register('totalGuardian')}
            registerField={'totalGuardian'}
          />
          {editing && (
            <Button type="submit" variant="contained">
              Обновить данные
            </Button>
          )}
        </form>
      </CardContent>

      <CardActions disableSpacing>
        {auth && (
          <>
            <IconButton onClick={() => setEditing(!editing)}>
              {editing ? <EditOffIcon /> : <ModeEditIcon />}
            </IconButton>
            <AppModal
              handle={() => deleteMember()}
              withButton
              btnText={'Удалить'}
              title={'Вы действительно хотите удалить сотрудника'}
              subtitle={
                'после подтверждения, это действие не возможно отменить'
              }
              icon
            />
          </>
        )}

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <AppProfileExpanded
        expanded={expanded}
        errors={errors}
        auth={auth}
        setErrors={setErrors}
        member={member}
      />
    </AppCard>
  );
};
