import {TheProfileInfoProps} from "./TheProfileInfo.props";
import Typography from "@mui/material/Typography";
import {AppDivider} from "../AppDivider/AppDivider";
import styles from "./TheProfileInfo.module.css";
import {CustomCurd} from "../CustomCard/CustomCurd";
import * as React from "react";

export const TheProfileInfo = ({member, ...props}: TheProfileInfoProps): JSX.Element => {
    return (
        <CustomCurd {...props}>
            <Typography color="primary" sx={{
                fontSize: "18px",
                fontWeight: "bold",
                lineHeight: "140%",
                marginBottom: "14px"
            }}>
                Информация о сотруднике
            </Typography>
            <Typography sx={{
                fontSize: "14px",
                fontWeight: "normal",
                lineHeight: "150%",
                marginBottom: "15px",
                color: "#A0AEC0"
            }}>
                {member.disciplines}
            </Typography>

            <AppDivider/>

            <div className={styles.profileInfo}>
                <ul >
                    <li className={styles.prifileInfoItem} >Специальности: <strong>{member.specialties}</strong></li>
                    <li className={styles.prifileInfoItem} >Должность: <strong>{member.qualification}</strong></li>
                    <li className={styles.prifileInfoItem} >Стаж работы: <strong>{member.totalGuardian}</strong></li>
                </ul>
            </div>


        </CustomCurd>
    );
};