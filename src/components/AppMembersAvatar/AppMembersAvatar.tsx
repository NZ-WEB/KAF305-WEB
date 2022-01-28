import { AppMembersAvatarProps } from './AppMembersAvatar.props';
import { Avatar, Badge } from '@mui/material';
import * as React from 'react';

export const AppMembersAvatar = ({
  editing,
  url,
  registerTitle,
  register,
}: AppMembersAvatarProps): JSX.Element => {
  return editing ? (
    <div>
      <Badge badgeContent="Изменить" color="primary">
        <Avatar
          sx={{ width: '80px', height: '80px' }}
          alt="Remy Sharp"
          src={url}
        />
      </Badge>
      <input
        {...register(registerTitle.toString())}
        type="text"
        defaultValue={url}
      />
    </div>
  ) : (
    <Avatar sx={{ width: '80px', height: '80px' }} alt="Remy Sharp" src={url} />
  );
};
