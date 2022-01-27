import {DetailedHTMLProps, HTMLAttributes} from "react";
import {MembersInterface} from "../../../interfaces/members.interface";

export interface TheProfileHeaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    member: MembersInterface;
    editing: boolean;
    setEditing(value: boolean);
    setErrors(errors: []);
    errors: [] | any[];
}