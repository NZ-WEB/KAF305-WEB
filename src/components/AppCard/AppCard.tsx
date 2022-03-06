import { AppCardProps } from './AppCard.props';
import { Card } from '@mui/material';

const style = {
  borderRadius: '1em',
  bgcolor: 'background.paper',
  border: 'none',
};

export const AppCard = ({ children, ...props }: AppCardProps): JSX.Element => {
  return (
    <Card elevation={2} sx={style} {...props}>
      {children}
    </Card>
  );
};
