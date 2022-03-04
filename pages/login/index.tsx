import { withLayout } from '../../layout/Layout';
import { useForm } from 'react-hook-form';
import UserService from '../../service/user/user.service';
import { useState } from 'react';
import { Alert } from '@mui/material';
import * as React from 'react';
import { useRouter } from 'next/router';
import { AppCard } from '../../src/components/AppCard/AppCard';

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
    <AppCard>
      <form onSubmit={onSubmit}>
        {errorsState.length > 0 &&
          errorsState.map((error) => (
            <Alert key={error.message} severity="error">
              {error.message}
            </Alert>
          ))}
        {errors.email && <span>This field is required</span>}
        {errors.password && <span>This field is required</span>}
        <input type="email" {...register('email', { required: true })} />
        <input type="password" {...register('password', { required: true })} />
        <button type="submit">Войти</button>
      </form>
    </AppCard>
  );
};

export default withLayout(LoginPage);
