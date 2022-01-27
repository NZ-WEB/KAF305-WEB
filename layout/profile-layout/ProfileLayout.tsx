import {ProfileLayoutProps} from "./ProfileLayout.props";
import styles from "./ProfileLayout.module.css";
import {AppButton, CustomCurd, TheProfileEditForm} from "../../src/components";
import {Avatar} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {TheProfileInfo} from "../../src/components/TheProfileInfo/TheProfileInfo";

const ProfileLayout = ({member}:ProfileLayoutProps): JSX.Element => {
  return (
      <div className={styles.layout}>
          <CustomCurd className={styles.header}>
              <div className={styles.cardHeader}>
                  <div className={styles.leftContent}>
                      <Avatar src={member.avatar} variant="rounded" sx={{borderRadius: "15px", width: "80px", height: "80px"}}>

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
                      <AppButton className={styles.buttonItem} filled={true}>
                          Изменить
                      </AppButton>
                      <AppButton className={styles.buttonItem} >
                          Удалить
                      </AppButton>
                  </div>
              </div>
          </CustomCurd>
          <TheProfileInfo className={styles.info} member={member}/>
          <TheProfileEditForm className={styles.editForm}/>
      </div>
  );
};

export default ProfileLayout;