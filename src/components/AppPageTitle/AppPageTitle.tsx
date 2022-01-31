import { Card, CardContent } from '@mui/material';
import { AppPageTitleProps } from './AppPageTitle.props';
import Typography from '@mui/material/Typography';

export const AppPageTitle = ({
  title,
  description,
  ...props
}: AppPageTitleProps): JSX.Element => {
  return (
    <Card {...props}>
      <CardContent>
        <Typography variant={'h1'}>{title}</Typography>
        <Typography variant={'subtitle1'}>{description}</Typography>
      </CardContent>
    </Card>
  );
};
