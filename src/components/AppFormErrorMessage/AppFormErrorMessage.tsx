import { AppFormErrorMessageProps } from './AppFormErrorMessage.props';
import Typography from '@mui/material/Typography';

export const AppFormErrorMessage = ({
  text,
  ...props
}: AppFormErrorMessageProps): JSX.Element => {
  return (
    <Typography color="error" variant={'subtitle2'} {...props}>
      {text}
    </Typography>
  );
};
