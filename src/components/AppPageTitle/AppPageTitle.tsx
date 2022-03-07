import Typography from '@mui/material/Typography';
import { AppPageTitleProps } from './AppPageTitle.props';

export const AppPageTitle = ({
  title,
  description,
}: AppPageTitleProps): JSX.Element => {
  return (
    <>
      <Typography variant={'h4'}>{title}</Typography>
      <Typography variant={'subtitle1'}>{description}</Typography>
    </>
  );
};
