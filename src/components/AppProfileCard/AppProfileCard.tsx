import { AppProfileCardProps } from './AppProfileCard.props';
import {
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Menu,
  MenuItem,
} from '@mui/material';
import MoreIcon from '@mui/icons-material/MoreVert';
import { AppModal } from '../AppModal/AppModal';
import * as React from 'react';
import { useContext, useState } from 'react';
import MembersService from '../../../service/members/members.service';
import { AppContext } from '../../../context';
import { useRouter } from 'next/router';
import { FieldValues, UnpackNestedValue, useForm } from 'react-hook-form';
import { AppMembersAvatar } from '../AppMembersAvatar/AppMembersAvatar';
import { AppMemberInfoField } from '../AppMemberInfoField/AppMemberInfoField';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { AppProfileExpanded } from '../AppProfileExpanded/AppProfileExpanded';
import { AppCard } from '../AppCard/AppCard';

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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
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

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
            <AppMembersAvatar
              editing={editing}
              url={member.avatar}
              register={() => register('avatar')}
              registerTitle={'avatar'}
            />
          ) : (
            <AppMembersAvatar
              editing={editing}
              url={member.avatar}
              register={() => register('avatar')}
              registerTitle={'avatar'}
            />
          )
        }
        action={
          auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => setEditing(!editing)}>
                  {editing ? 'Отм. режим редактирования' : 'Изменить'}
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <AppModal
                    handle={() => deleteMember()}
                    withButton={true}
                    btnText={'Удалить'}
                    title={'Вы действительно хотите удалить сотрудника'}
                    subtitle={
                      'после подтверждения, это действие не возможно отменить'
                    }
                  />
                </MenuItem>
              </Menu>
            </div>
          )
        }
        title={
          member.fullName &&
          (editing ? (
            <label>
              Полное имя
              <input
                defaultValue={member.fullName}
                type="text"
                {...register('fullName')}
              />
            </label>
          ) : (
            member.fullName
          ))
        }
        subheader={
          member.fullName &&
          (editing ? (
            <label>
              Должность
              <input
                defaultValue={member.post}
                type="text"
                {...register('post')}
              />
            </label>
          ) : (
            member.post
          ))
        }
      />
      <CardContent>
        <form onSubmit={onSubmit}>
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
