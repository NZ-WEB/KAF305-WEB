import { MembersInterface } from '../../../interfaces/members.interface';
import { CardProps } from 'material-ui';

export interface TheMembersTableProps extends CardProps {
  members: [] | MembersInterface[];
}
