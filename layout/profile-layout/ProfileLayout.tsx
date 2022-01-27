import {ProfileLayoutProps} from "./ProfileLayout.props";
import styles from "./ProfileLayout.module.css";
import {AppButton, CustomCurd, TheProfileEditForm} from "../../src/components";
import {Avatar} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {TheProfileInfo} from "../../src/components/TheProfileInfo/TheProfileInfo";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context";
import {useRouter} from "next/router";
import MembersService from "../../service/members/members.service";
import {MembersInterface} from "../../interfaces/members.interface";
import {TheProfileHeader} from "../../src/components/TheProfileHeader/TheProfileHeader";
import cn from 'classnames';

const ProfileLayout = ({}: ProfileLayoutProps): JSX.Element => {
    const [member, setMember] = useState<null | MembersInterface>(null);
    const router = useRouter();
    const membersService = new MembersService();
    const slug = router.query.slug?.toString();

    const [errors, setErrors] = useState([]);
    const [editing, setEditing] = useState<boolean>(false);
    const {auth} = useContext(AppContext);

    useEffect(() => {
        if (process.browser && slug) {
            membersService.getBySlug(slug)
                .then((member) => setMember(member))
                .catch((e) => setErrors([...errors, e]));
        }
    }, [slug]);

    return (
        <div className={cn(styles.layout, {
            [styles.layoutEditing]: editing
        })}>
            {member ? <TheProfileHeader errors={errors} setErrors={setErrors} editing={editing} setEditing={setEditing} className={styles.header} member={member} /> : null}
            {member ? <TheProfileInfo className={styles.info} member={member}/> : null}
            {member ? <TheProfileEditForm className={styles.editForm}/> : null}
        </div>
    );
};

export default ProfileLayout;