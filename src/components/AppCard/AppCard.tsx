import { AppCardProps } from './AppCard.props';
import { Card } from '@mui/material';

export const AppCard = ({ children, ...props }: AppCardProps): JSX.Element => {
  return (
    <Card sx={{ padding: '0px' }} elevation={0} {...props}>
      {children}
    </Card>
  );
};
