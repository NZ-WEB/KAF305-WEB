/* eslint-disable prettier/prettier */
import { AppMembersAvatarProps } from './AppMembersAvatar.props';
import { Avatar, TextField } from '@mui/material';
import * as React from 'react';

export const AppMembersAvatar = ({
  editing,
  url,
  registerTitle,
  register,
}: AppMembersAvatarProps): JSX.Element => {
  return editing ? (
    <>
      <TextField id="outlined-basic" label="Outlined" variant="outlined"
        {...register(registerTitle.toString())}
        defaultValue={url}
      />
    </>
  ) : (
    <Avatar sx={{ width: '80px', height: '80px' }} alt="Remy Sharp" src={url} />
  );
};
