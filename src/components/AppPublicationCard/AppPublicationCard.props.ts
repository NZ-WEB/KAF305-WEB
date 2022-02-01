import { CardProps } from 'material-ui';
import { PublicationInterface } from '../../../interfaces/publication.interface';

export interface AppPublicationCardProps extends CardProps {
  publication: PublicationInterface;
  auth?: boolean;
}
