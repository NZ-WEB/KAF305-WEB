import { withLayout } from '../../../layout/Layout';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import MembersService from '../../../service/members/members.service';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as React from 'react';
import { AppErrors } from '../../../src/components/AppErrors/AppErrors';
import { AppFormErrorMessage } from '../../../src/components';
import { MembersInterface } from '../../../interfaces/members.interface';

const CreatePage = (): JSX.Element => {
  const membersService = new MembersService();
  const [errorsState, setErrorsState] = useState([]);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data: MembersInterface) =>
    membersService
      .create(data)
      .then(() => router.push(`/`))
      .catch((e) => setErrorsState([...errorsState, ...e])),
  );

  return (
    <div>
      <Card>
        <CardContent>
          {errorsState.length > 0 && <AppErrors errors={errorsState} />}
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <form onSubmit={onSubmit}>
            <Typography variant={'h4'}>Добавить сотрудника кафедры</Typography>
            <div>
              <label htmlFor="fullName">
                Полное имя:{' '}
                <input
                  {...register('fullName', { required: true })}
                  name="fullName"
                  type="text"
                />
              </label>
              {errors.fullName && (
                <AppFormErrorMessage text="Это поле обязательно" />
              )}
            </div>
            <div>
              <label htmlFor="post">
                Должность:{' '}
                <input
                  {...register('post', { required: true })}
                  name="post"
                  type="text"
                />
                {errors.post && (
                  <AppFormErrorMessage text="Это поле обязательно" />
                )}
              </label>
            </div>
            <div>
              <label htmlFor="disciplines">
                Дисциплины:{' '}
                <input
                  {...register('disciplines', { required: true })}
                  name="disciplines"
                  type="text"
                />
                {errors.disciplines && (
                  <AppFormErrorMessage text="Это поле обязательно" />
                )}
              </label>
            </div>
            <div>
              <label htmlFor="education">
                Образование:{' '}
                <input
                  {...register('education', { required: true })}
                  name="education"
                  type="text"
                />
                {errors.education && (
                  <AppFormErrorMessage text="Это поле обязательно" />
                )}
              </label>
            </div>
            <div>
              <label htmlFor="qualification">
                Квалификация:{' '}
                <input
                  {...register('qualification', { required: true })}
                  name="qualification"
                  type="text"
                />
                {errors.qualification && (
                  <AppFormErrorMessage text="Это поле обязательно" />
                )}
              </label>
            </div>
            <div>
              <label htmlFor="academicDegree">
                Кандидатская степень:{' '}
                <input
                  {...register('academicDegree', { required: true })}
                  name="academicDegree"
                  type="text"
                />
                {errors.academicDegree && (
                  <AppFormErrorMessage text="Это поле обязательно" />
                )}
              </label>
            </div>
            <div>
              <label htmlFor="specialties">
                Специальность:{' '}
                <input
                  {...register('specialties', { required: true })}
                  name="specialties"
                  type="text"
                />
                {errors.specialties && (
                  <AppFormErrorMessage text="Это поле обязательно" />
                )}
              </label>
            </div>

            <div>
              <label htmlFor="advancedTraining">
                Повышение квалификации:{' '}
                <input
                  {...register('advancedTraining', { required: true })}
                  name="advancedTraining"
                  type="text"
                />
                {errors.advancedTraining && (
                  <AppFormErrorMessage text="Это поле обязательно" />
                )}
              </label>
            </div>
            <div>
              <label htmlFor="specGuardian">
                Стаж работы по специальности:{' '}
                <input
                  {...register('specGuardian', { required: true })}
                  name="specGuardian"
                  type="text"
                />
                {errors.specGuardian && (
                  <AppFormErrorMessage text="Это поле обязательно" />
                )}
              </label>
            </div>
            <div>
              <label htmlFor="totalGuardian">
                Рабочий стаж:{' '}
                <input
                  {...register('totalGuardian', { required: true })}
                  name="totalGuardian"
                  type="text"
                />
                {errors.totalGuardian && (
                  <AppFormErrorMessage text="Это поле обязательно" />
                )}
              </label>
            </div>
            <div>
              <label htmlFor="avatar">
                Аватар:{' '}
                <input
                  {...register('avatar', { required: true })}
                  name="avatar"
                  type="text"
                />
                {errors.avatar && (
                  <AppFormErrorMessage text="Это поле обязательно" />
                )}
              </label>
            </div>
            <Button type="submit" variant="contained">
              Создать
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default withLayout(CreatePage);
