import {DetailedHTMLProps, HTMLAttributes} from "react";
import {MembersInterface} from "../../../interfaces/members.interface";

export interface TheProfileEditFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    errors: any[] | [];
    setErrors(value: []);
    editing: boolean;
    setEditing(value: boolean);
    member: MembersInterface;
    setMember(value: MembersInterface);
}