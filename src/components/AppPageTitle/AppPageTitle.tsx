import { CardContent } from '@mui/material';
import { AppPageTitleProps } from './AppPageTitle.props';
import Typography from '@mui/material/Typography';
import { AppCard } from '../AppCard/AppCard';

export const AppPageTitle = ({
  title,
  description,
  ...props
}: AppPageTitleProps): JSX.Element => {
  return (
    <AppCard {...props}>
      <CardContent>
        <Typography variant={'h3'}>{title}</Typography>
        <Typography variant={'subtitle1'}>{description}</Typography>
      </CardContent>
    </AppCard>
  );
};
