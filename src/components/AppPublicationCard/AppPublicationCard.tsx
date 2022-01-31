import { AppPublicationCardProps } from './AppPublicationCard.props';
import { Card, CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';

export const AppPublicationCard = ({
  publication,
  ...props
}: AppPublicationCardProps): JSX.Element => {
  return (
    <Card {...props}>
      <CardContent>
        <Typography variant={'subtitle1'}>{publication.body}</Typography>
        <Typography variant={'subtitle2'}>{publication.title}</Typography>
      </CardContent>
    </Card>
  );
};
