import { CardProps } from 'material-ui';
import { PublicationInterface } from '../../../interfaces/publication.interface';

export interface AppPublicationCardProps extends CardProps {
  publication: PublicationInterface;
  auth?: boolean;
  errors: any[];
  setErrors(value: any[]);
  setPublications(value: any);
  setDeletePublication(value: PublicationInterface);
}
