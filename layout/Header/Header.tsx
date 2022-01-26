import styles from './Header.module.css';
import {HeaderProps} from "./Header.props";
import Typography from "@mui/material/Typography";
import PersonIcon from '@mui/icons-material/Person';
import {Breadcrumbs} from "@mui/material";
import Link from '@mui/material/Link';

const Header = ({...props}: HeaderProps): JSX.Element => {

    return (
        <header {...props} className={styles.header}>
            <div className={styles.content}>
                <Typography color="primary">
                    <Breadcrumbs color="secondary" aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href="/">
                            MUI
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            href="/getting-started/installation/"
                        >
                            Core
                        </Link>
                        <Typography color="primary">Breadcrumbs</Typography>
                    </Breadcrumbs>
                    Кафедра 305
                </Typography>
            </div>
            <div className={styles.right}>
                <PersonIcon  color="secondary"/>
                <Typography color="secondary">
                    Войти
                </Typography>
            </div>
        </header>
    );
};

export default Header;