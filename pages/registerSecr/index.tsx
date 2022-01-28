import { withLayout } from '../../layout/Layout';
import { useForm } from 'react-hook-form';
import { Alert, Card, CardContent } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import UserService from '../../service/user/user.service';
import { useRouter } from 'next/router';

const RegisterSecr = (): JSX.Element => {
  const [errorsState, setErrorsState] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const userService = new UserService();
  const router = useRouter();

  const onSubmit = handleSubmit((data) =>
    userService
      .register(data as any)
      .then(() => router.push(`/`))
      .catch((e) => setErrorsState([...errorsState, e])),
  );

  return (
    <Card>
      <CardContent>
        {errorsState.length > 0 &&
          errorsState.map((error) => (
            <Alert key={error.message} severity="error">
              {error.message}
            </Alert>
          ))}
        {errors.email && <span>"Поле: email обязательно"</span>}
        {errors.password && <span>Поле: пароля обязательно</span>}
        {errors.username && <span>Поле: имя пользователя обязательно</span>}
        {errors.bio && <span>Поле: основная информация обязательно</span>}
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Введите имя пользователя на английском"
            {...register('username', { required: true })}
          />
          <input
            type="email"
            placeholder="Введите e-mail"
            {...register('email', { required: true })}
          />
          <input
            type="password"
            placeholder="Введите пароль"
            {...register('password', { required: true })}
          />
          <textarea
            placeholder="Введите основную информацию"
            {...register('bio', { required: true })}
          />
          <button type="submit">Зарегестрировать</button>
        </form>
      </CardContent>
    </Card>
  );
};

export default withLayout(RegisterSecr);
