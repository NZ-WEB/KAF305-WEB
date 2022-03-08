/* eslint-disable prettier/prettier */
import { Grid, TextField } from '@mui/material';
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
    <>
      {data && !editing && (
        <>
          <Grid
            marginY={1}
            container
            gap={3}
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Grid padding={0} item xs={4}>
              <Typography variant="subtitle1">
                {title}:
              </Typography>
            </Grid>
            <Grid padding={0} item xs={7}>
              <Typography variant="body1">
                {data}
              </Typography>
            </Grid>
          </Grid>
        </>
      )}

      {editing && (
        <TextField
          margin="dense"
          fullWidth
          id={title}
          label={title}
          variant="outlined"
          defaultValue={data}
          type="text"
          {...register(registerField.toString())}
        />
      )}
    </>
  );
};
