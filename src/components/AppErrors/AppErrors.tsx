import { AppErrorsProps } from './AppErrors.props';
import { Alert } from '@mui/material';

export const AppErrors = ({
  errors,
  ...props
}: AppErrorsProps): JSX.Element => {
  return (
    <Alert variant="outlined" severity="error" {...props}>
      <ul>
        {errors &&
          errors.map((error) => {
            return <li>{error}</li>;
          })}
      </ul>
    </Alert>
  );
};
