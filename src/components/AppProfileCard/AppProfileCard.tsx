import { AppProfileCardProps } from './AppProfileCard.props';
import {Avatar, Button, Card, CardContent, CardHeader, Menu, MenuItem} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MoreIcon from "@mui/icons-material/MoreVert";
import {AppModal} from "../AppModal/AppModal";
import * as React from "react";
import {useContext, useState} from "react";
import MembersService from "../../../service/members/members.service";
import {AppContext} from "../../../context";
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
import {AppMembersAvatar} from "../AppMembersAvatar/AppMembersAvatar";
import {AppMemberInfoField} from "../AppMemberInfoField/AppMemberInfoField";

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
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const onSubmit = handleSubmit((data) =>
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
    <Card {...props}>
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
    </Card>
  );
};
