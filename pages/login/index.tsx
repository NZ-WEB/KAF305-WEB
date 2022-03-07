import { withLayout } from '../../layout/Layout';
import { useForm } from 'react-hook-form';
import UserService from '../../service/user/user.service';
import { useState } from 'react';
import {
  Alert,
  Breadcrumbs,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import * as React from 'react';
import { useRouter } from 'next/router';

const LoginPage = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorsState, setErrorsState] = useState([]);
  const router = useRouter();
  const userService = new UserService();

  const onSubmit = handleSubmit((data) =>
    userService
      .login(data as any)
      .then(() => router.push(`/`))
      .catch((e) => setErrorsState([...errorsState, e])),
  );
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Главная
          </Link>
          <Typography color="text.primary">Войти в аккаунт</Typography>
        </Breadcrumbs>

        <Typography variant="h4">Войти в аккаунт</Typography>

        <form onSubmit={onSubmit}>
          {errorsState.length > 0 &&
            errorsState.map((error) => (
              <Alert
                sx={{ marginY: '0.5em' }}
                key={error.message}
                severity="error"
              >
                {error.message}
              </Alert>
            ))}

          <TextField
            margin="dense"
            fullWidth
            error={errors.email}
            id="email"
            label="Email"
            variant="outlined"
            helperText={errors.email ? 'Это поле обязательно к заполнению' : ''}
            {...register('email', { required: true })}
          />

          <TextField
            margin="dense"
            fullWidth
            error={errors.password}
            id="password"
            label="Пароль"
            variant="outlined"
            helperText={
              errors.password ? 'Это поле обязательно к заполнению' : ''
            }
            {...register('password', { required: true })}
          />

          <Button
            type="submit"
            sx={{ marginTop: '0.5em' }}
            variant="contained"
            fullWidth
          >
            Войти
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default withLayout(LoginPage);
