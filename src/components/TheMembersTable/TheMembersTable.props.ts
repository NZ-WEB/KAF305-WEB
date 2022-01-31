import { MembersInterface } from '../../../interfaces/members.interface';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import {CardTypeMap} from "@mui/material";
import {OverridableComponent} from "@mui/material/OverridableComponent";
import {CardProps} from "material-ui";

export interface TheMembersTableProps extends CardProps {
  members: [] | MembersInterface[];
}
