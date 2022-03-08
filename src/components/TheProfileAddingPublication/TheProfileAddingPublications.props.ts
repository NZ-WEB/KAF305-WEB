import { CardProps } from 'material-ui';
import { MembersInterface } from '../../../interfaces/members.interface';
import { PublicationInterface } from '../../../interfaces/publication.interface';

export interface TheProfileAddingPublicationsProps extends CardProps {
  adding: boolean;
  setAdding(value: boolean);
  auth: boolean;
  errors: any[];
  setErrors(value: any[]);
  member: MembersInterface;
  setPublications(value: PublicationInterface);
}
