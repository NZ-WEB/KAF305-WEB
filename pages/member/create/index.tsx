import {withLayout} from "../../../layout/Layout";
import {Alert, Button, Card, CardContent, CardHeader, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import MembersService from "../../../service/members/members.service";
import {useRouter} from "next/router";
import {useState} from "react";
import * as React from "react";

const CreatePage = (): JSX.Element => {
    const membersService = new MembersService();
    const [errorsState, setErrorsState] = useState([])
    const router = useRouter();
    const {register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = handleSubmit((data) => membersService.create(data)
        .then(() => router.push(`/`))
        .catch((e) => setErrorsState([...errorsState, e]))
    );

    return (
        <div>
            <Card>
                <CardContent>
                    {errors.fullName && <span>Это поле обязательно</span>}
                    {errors.post && <span>Это поле обязательно</span>}
                    {errorsState.length > 0 && errorsState.map((error) => <Alert key={error.message} severity="error">{error.message}</Alert>)}
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <form onSubmit={onSubmit}>
                        <Typography variant={"h4"}>Добавить сотрудника кафедры</Typography>
                        <div>
                            <label htmlFor="fullName">Полное имя: <input {...register("fullName", {required: true})}
                                                                         name="fullName" type="text"/></label>
                        </div>
                        <div>
                            <label htmlFor="post">Должность: <input {...register("post", {required: true})} name="post"
                                                                    type="text"/></label>
                        </div>
                        <div>
                            <label htmlFor="disciplines">Дисциплины: <input {...register("disciplines")}
                                                                            name="disciplines" type="text"/></label>
                        </div>
                        <div>
                            <label htmlFor="education">Образование: <input {...register("education")} name="education"
                                                                           type="text"/></label>
                        </div>
                        <div>
                            <label htmlFor="qualification">Квалификация: <input {...register("qualification")}
                                                                                name="qualification"
                                                                                type="text"/></label>
                        </div>
                        <div>
                            <label htmlFor="academicDegree">Кандидатская степень: <input {...register("academicDegree")}
                                                                                         name="academicDegree"
                                                                                         type="text"/></label>
                        </div>
                        <div>
                            <label htmlFor="specialties">Специальность: <input {...register("specialties")}
                                                                               name="specialties" type="text"/></label>
                        </div>

                        <div>
                            <label htmlFor="advancedTraining">Повышение квалификации: <input {...register("advancedTraining")}
                                                                               name="advancedTraining" type="text"/></label>
                        </div>
                        <div>
                            <label htmlFor="specGuardian">Стаж работы по специальности: <input {...register("specGuardian")}
                                                                               name="specGuardian" type="text"/></label>
                        </div>
                        <div>
                            <label htmlFor="totalGuardian">Рабочий стаж: <input {...register("totalGuardian")}
                                                                                name="totalGuardian"
                                                                                type="text"/></label>
                        </div>
                        <div>
                            <label htmlFor="avatar">Аватар: <input {...register("avatar")} name="avatar"
                                                                     type="text"/></label>
                        </div>
                        <Button type="submit" variant="contained">Создать</Button>
                    </form>
                </CardContent>
            </Card>
        </div>

    );
};

export default withLayout(CreatePage);