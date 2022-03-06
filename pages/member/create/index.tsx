import { withLayout } from '../../../layout/Layout';
import {
  Breadcrumbs,
  Button,
  CardContent,
  CardHeader,
  Grid,
  Link,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import MembersService from '../../../service/members/members.service';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as React from 'react';
import { AppErrors } from '../../../src/components/AppErrors/AppErrors';
import { MembersInterface } from '../../../interfaces/members.interface';
import { AppCard } from '../../../src/components/AppCard/AppCard';
import Typography from '@mui/material/Typography';

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
    <Grid container justifyContent="center">
      <Grid item xs={12} md={8}>
        <Breadcrumbs sx={{ paddingX: '1em' }} aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Главная
          </Link>
          <Link underline="hover" color="inherit" href="/news">
            Сотрудники
          </Link>
          <Typography color="text.primary">Добавить</Typography>
        </Breadcrumbs>
      </Grid>

      {errorsState.length > 0 && (
        <Grid item xs={12} md={8}>
          <AppCard>
            <CardContent>{<AppErrors errors={errorsState} />}</CardContent>
          </AppCard>
        </Grid>
      )}

      <Grid item xs={12} md={8}>
        <CardHeader title="Добавить сотрудника кафедры" />
        <CardContent>
          <form onSubmit={onSubmit}>
            <TextField
              margin="dense"
              fullWidth
              error={errors.fullName}
              id="fullName"
              label="Ф.И.О. сотрудника"
              variant="outlined"
              helperText={
                errors.fullName ? 'Это поле обязательно к заполнению' : ''
              }
              {...register('fullName', { required: true })}
            />

            <TextField
              margin="dense"
              fullWidth
              error={errors.post}
              id="post"
              label="Должность"
              variant="outlined"
              helperText={
                errors.post ? 'Это поле обязательно к заполнению' : ''
              }
              {...register('post', { required: true })}
            />

            <TextField
              margin="dense"
              fullWidth
              error={errors.disciplines}
              id="disciplines"
              label="Дисциплины"
              variant="outlined"
              helperText={
                errors.disciplines ? 'Это поле обязательно к заполнению' : ''
              }
              {...register('disciplines', { required: true })}
            />

            <TextField
              margin="dense"
              fullWidth
              error={errors.education}
              id="education"
              label="Образование"
              variant="outlined"
              helperText={
                errors.education ? 'Это поле обязательно к заполнению' : ''
              }
              {...register('education', { required: true })}
            />

            <TextField
              margin="dense"
              fullWidth
              error={errors.qualification}
              id="qualification"
              label="Квалификация"
              variant="outlined"
              helperText={
                errors.qualification ? 'Это поле обязательно к заполнению' : ''
              }
              {...register('qualification', { required: true })}
            />

            <TextField
              margin="dense"
              fullWidth
              error={errors.academicDegree}
              id="academicDegree"
              label="Кандидатская степень"
              variant="outlined"
              helperText={
                errors.academicDegree ? 'Это поле обязательно к заполнению' : ''
              }
              {...register('academicDegree', { required: true })}
            />

            <TextField
              margin="dense"
              fullWidth
              error={errors.specialties}
              id="specialties"
              label="Специальность"
              variant="outlined"
              helperText={
                errors.specialties ? 'Это поле обязательно к заполнению' : ''
              }
              {...register('specialties', { required: true })}
            />

            <TextField
              margin="dense"
              fullWidth
              error={errors.advancedTraining}
              id="advancedTraining"
              label="Повышение квалификации"
              variant="outlined"
              helperText={
                errors.advancedTraining
                  ? 'Это поле обязательно к заполнению'
                  : ''
              }
              {...register('advancedTraining', { required: true })}
            />

            <TextField
              margin="dense"
              fullWidth
              error={errors.specGuardian}
              id="specGuardian"
              label="Стаж работы по специальность"
              variant="outlined"
              helperText={
                errors.specGuardian ? 'Это поле обязательно к заполнению' : ''
              }
              {...register('specGuardian', { required: true })}
            />

            <TextField
              margin="dense"
              fullWidth
              error={errors.totalGuardian}
              id="totalGuardian"
              label="Общий стаж работы"
              variant="outlined"
              helperText={
                errors.totalGuardian ? 'Это поле обязательно к заполнению' : ''
              }
              {...register('totalGuardian', { required: true })}
            />

            <TextField
              margin="dense"
              fullWidth
              error={errors.avatar}
              id="avatar"
              label="Аватар"
              variant="outlined"
              helperText={
                errors.avatar ? 'Это поле обязательно к заполнению' : ''
              }
              {...register('avatar', { required: true })}
            />

            <Button
              sx={{ marginTop: '0.5em' }}
              fullWidth
              type="submit"
              variant="contained"
            >
              Создать
            </Button>
          </form>
        </CardContent>
      </Grid>
    </Grid>
  );
};

export default withLayout(CreatePage);
