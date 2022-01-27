import {MembersInterface} from "../../../interfaces/members.interface";
import {DetailedHTMLProps, HTMLAttributes} from "react";

export interface TheProfileInfoProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    member: MembersInterface;
}