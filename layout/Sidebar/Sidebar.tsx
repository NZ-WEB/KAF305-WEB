import {CustomCurd} from "../../src/components";
import {SidebarProps} from "./Sidebar.props";

export const Sidebar = ({...props}: SidebarProps):JSX.Element => {
    return (
        <CustomCurd {...props}>
            <ul>
                <li>Sidebar</li>
                <li>Sidebar</li>
                <li>Sidebar</li>
                <li>Sidebar</li>
                <li>Sidebar</li>
                <li>Sidebar</li>
            </ul>
        </CustomCurd>
    );
}