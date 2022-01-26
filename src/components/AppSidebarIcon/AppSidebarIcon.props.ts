import {DetailedHTMLProps, HTMLAttributes, ReactNode} from "react";

export interface AppSidebarIconProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    active: boolean;
    children: ReactNode;
}