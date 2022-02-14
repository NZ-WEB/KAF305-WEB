import { ListItemButtonProps } from '@mui/material';
import { ReactNode } from 'react';

export interface AppSideBarListItemProps extends ListItemButtonProps {
  title: string;
  route?: string;
  expanding?: boolean;
  children?: ReactNode;
}
