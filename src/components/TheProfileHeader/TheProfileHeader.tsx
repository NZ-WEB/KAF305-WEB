import {TheProfileHeaderProps} from "./TheProfileHeader.props";
import {Avatar} from "@mui/material";
import Typography from "@mui/material/Typography";
import {AppButton} from "../AppButton/AppButton";
import {CustomCurd} from "../CustomCard/CustomCurd";
import * as React from "react";
import styles from './TheProfileHeader.module.css';
import {useContext} from "react";
import {AppContext} from "../../../context";
import MembersService from "../../../service/members/members.service";
import {useRouter} from "next/router";
import {AppModal} from "../AppModal/AppModal";

export const TheProfileHeader = ({
                                     member,
                                     errors,
                                     setErrors,
                                     editing,
                                     setEditing,
                                     ...props
                                 }: TheProfileHeaderProps): JSX.Element => {
    const router = useRouter();
    const {auth} = useContext(AppContext);
    const membersService = new MembersService();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const deleteMember = () => {
        const slug = member.slug;
        membersService.delete(slug)
            .then((response) => console.log(response))
            .catch((e) => setErrors([...errors, e]));
        router.push('/');
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <CustomCurd className={styles.header} {...props} >
            <div className={styles.cardHeader}>
                <div className={styles.leftContent}>
                    <Avatar src={member.avatar} variant="rounded"
                            sx={{borderRadius: "15px", width: "80px", height: "80px"}}>

                    </Avatar>
                    <div className={styles.cardHeaderText}>
                        <Typography color="primary" sx={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            lineHeight: "140%"
                        }}>
                            {member.fullName}
                        </Typography>
                        <Typography sx={{
                            fontSize: "14px",
                            fontWeight: "normal",
                            lineHeight: "150%",
                            color: "#A0AEC0"
                        }}>
                            {member.post}
                        </Typography>
                    </div>
                </div>
                <div className={styles.buttonGroup}>
                    {auth &&
                        <AppButton onClick={() => setEditing(!editing)} className={styles.buttonItem} filled={true}>
                            {editing ? "Закрыть режим изменения" : "Изменить"}
                        </AppButton>}
                    {auth &&
                        <AppModal
                            handle={() => deleteMember()}
                            withButton={true}
                            btnText={"Удалить"}
                            title={"Вы действительно хотите удалить сотрудника"}
                            subtitle={"после подтверждения, это действие не возможно отменить"}
                        />
                    }
                </div>
            </div>
        </CustomCurd>
    );
};