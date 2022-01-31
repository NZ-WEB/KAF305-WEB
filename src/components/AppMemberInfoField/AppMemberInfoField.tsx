import Typography from '@mui/material/Typography';
import * as React from 'react';
import { AppMemberInfoFieldProps } from './AppMemberInfoField.props';

/*
 * the component renders the data prefixed as a header,
 * if the edit mode is enabled, then edit fields
 * are shown in which you can change the member data
 */

export const AppMemberInfoField = ({
  data,
  title,
  editing,
  register,
  registerField,
}: AppMemberInfoFieldProps): JSX.Element => {
  return (
    <Typography variant="subtitle1" color="text.secondary">
      {data && `${title}:`}{' '}
      {editing ? (
        <span>
          {!data && `${title}:`}
          <input
            {...register(registerField.toString())}
            type="text"
            defaultValue={data}
          />
        </span>
      ) : (
        data && data
      )}
    </Typography>
  );
};
