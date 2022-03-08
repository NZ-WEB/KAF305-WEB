import { Chip, TextField } from '@mui/material';
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
      {/* <Typography variant="subtitle1" color="text.secondary"> */}
      {data && !editing && (
        <>
          <Typography sx={{display: "flex", justifyContent: "space-between", marginY: "0.5em"}} variant="subtitle1">
            {title}:  <Chip label={data} variant="outlined" />
          </Typography>
          
        </>
        )
      }
      {/* </Typography> */}
      {editing && (
        <TextField margin="dense" fullWidth id={title} label={title} variant="outlined"
          defaultValue={title}
          type="text"
          {...register(registerField.toString())}
        />
      )
      }
    </>
  );
};
