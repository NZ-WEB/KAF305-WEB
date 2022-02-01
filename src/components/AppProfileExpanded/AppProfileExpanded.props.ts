import { CollapseProps } from '@mui/material';
import { MembersInterface } from '../../../interfaces/members.interface';

export interface AppProfileExpandedProps extends CollapseProps {
  expanded: boolean;
  errors: any[];
  auth: boolean;
  setErrors(value: any[]);
  member: MembersInterface;
}
