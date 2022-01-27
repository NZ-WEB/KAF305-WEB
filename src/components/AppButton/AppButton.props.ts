import {DetailedHTMLProps, HTMLAttributes, ReactNode} from "react";

export interface AppButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    outlined?: boolean;
    filled?: boolean;
    children: ReactNode;
}