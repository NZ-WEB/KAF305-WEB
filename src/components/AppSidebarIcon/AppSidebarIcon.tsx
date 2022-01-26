import {AppSidebarIconProps} from "./AppSidebarIcon.props";
import styles from './AppSidebarIcon.module.css';
import cn from 'classnames';

export const AppSidebarIcon = ({active, children, ...props}: AppSidebarIconProps): JSX.Element => {
    return (
        <div className={cn(styles.wrapper, {
            [styles.active]: active
        })} {...props}>
            {children}
        </div>
    );
};