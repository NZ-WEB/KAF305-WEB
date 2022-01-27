import {TheProfileEditFormProps} from "./TheProfileEditForm.props";
import {CustomCurd} from "../CustomCard/CustomCurd";
import {TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import MembersService from "../../../service/members/members.service";
import {AppButton} from "../AppButton/AppButton";
import styles from './TheProfileEdit.module.css';
import Typography from "@mui/material/Typography";
import * as React from "react";

export const TheProfileEditForm = ({
           editing,
           setEditing,
           member,
           setMember,
           errors,
           setErrors,
           ...props
        }: TheProfileEditFormProps): JSX.Element => {
    const membersService = new MembersService();
    const {register, handleSubmit, formState: {errors: formErrors}} = useForm();

    const onSubmit = handleSubmit((data) =>
        membersService.update(data, member.slug)
        .then((member) => setMember(member))
        .then(member => console.log(member, 'new member'))
        .then(() => setEditing(false))
        .catch((e) => setErrors([...errors, e]))
    );

    return (
        <CustomCurd {...props}>
            <form className={styles.form} onSubmit={onSubmit}>
                <Typography color="primary" sx={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    lineHeight: "140%",
                    marginBottom: "14px"
                }}>
                    Редактирование информации о сотруднике
                </Typography>
                <TextField defaultValue={member.fullName} label="Ф.И.О." color="primary" focused sx={{
                    margin: "9px",
                    "& .MuiInputBase-input": {
                        color: "#fff"
                    },
                    "& .MuiInputBase-root": {
                        borderRadius: "15px"
                    }
                }}
                           {...register("fullName")}
                />

                <TextField defaultValue={member.post} label="Должность" color="primary" focused sx={{
                    margin: "9px",
                    "& .MuiInputBase-input": {
                        color: "#fff"
                    },
                    "& .MuiInputBase-root": {
                        borderRadius: "15px"
                    }
                }}
                           {...register("post")}
                />

                <TextField defaultValue={member.disciplines} label="Дисциплины" color="primary" focused sx={{
                    margin: "9px",
                    "& .MuiInputBase-input": {
                        color: "#fff"
                    },
                    "& .MuiInputBase-root": {
                        borderRadius: "15px"
                    }
                }}
                           {...register("disciplines")}
                />

                <TextField defaultValue={member.qualification} label="должность" color="primary" focused sx={{
                    margin: "9px",
                    "& .MuiInputBase-input": {
                        color: "#fff"
                    },
                    "& .MuiInputBase-root": {
                        borderRadius: "15px"
                    }
                }}
                           {...register("qualification")}
                />

                <TextField defaultValue={member.specialties} label="Специальность" color="primary" focused sx={{
                    margin: "9px",
                    "& .MuiInputBase-input": {
                        color: "#fff"
                    },
                    "& .MuiInputBase-root": {
                        borderRadius: "15px"
                    }
                }}
                           {...register("specialties")}
                />

                <TextField defaultValue={member.totalGuardian} label="Опыт работы" color="primary" focused sx={{
                    margin: "9px",
                    "& .MuiInputBase-input": {
                        color: "#fff"
                    },
                    "& .MuiInputBase-root": {
                        borderRadius: "15px"
                    }
                }}
                           {...register("totalGuardian")}
                />

                <TextField defaultValue={member.avatar} label="Аватар" color="primary" focused sx={{
                    margin: "9px",
                    "& .MuiInputBase-input": {
                        color: "#fff"
                    },
                    "& .MuiInputBase-root": {
                        borderRadius: "15px"
                    }
                }}
                           {...register("avatar")}
                />
                <button className={styles.sendBtn} type="submit">Сохранить изменения</button>
            </form>
        </CustomCurd>
    );
};