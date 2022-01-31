import { CardProps } from 'material-ui';
import { MembersInterface } from '../../../interfaces/members.interface';

export interface AppProfileCardProps extends CardProps {
  member: MembersInterface;
  setMember(value: MembersInterface);
  auth: boolean;
  errors: any[];
  setErrors(value: any[]);
}
