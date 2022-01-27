import {DetailedHTMLProps, HTMLAttributes, ReactNode} from "react";

export interface CustomCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: ReactNode;
}