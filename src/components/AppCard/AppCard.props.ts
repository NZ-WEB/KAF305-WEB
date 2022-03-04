import { CardProps } from 'material-ui';
import { ReactNode } from 'react';

export interface AppCardProps extends CardProps {
  children: ReactNode;
}
