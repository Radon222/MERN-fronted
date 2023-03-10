import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import styles from './Login.module.scss';
import { fetchAuth, selectIsAuth } from '../../redux/slices/auth';
import { CleaningServices } from '@mui/icons-material';

export const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: 'test@test.ru',
      password: '123',
    },
    mode: 'onChange',
  });

  const onSubmit = async values => {
    const data = await dispatch(fetchAuth(values));
    if (!data.payload) {
      return alert('Не удалость авторизоваться!');
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  // React.useEffect(() => {}, []);

  // console.log("isAuth", isAuth);

  if (isAuth) {
    return <Navigate to='/' />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant='h5'>
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          type='email'
          label='E-Mail'
          error={Boolean(errors.email?.message)}
          // error={true}
          helperText={errors.email?.message}
          {...register('email', { required: 'Укажите почту!' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          error={Boolean(errors.password?.message)}
          label='Пароль'
          helperText={errors.password?.message}
          {...register('password', { required: 'Укажите пароль!' })}
          fullWidth
        />
        <Button
          disabled={!isValid}
          type='submit'
          size='large'
          variant='contained'
          fullWidth
        >
          Войти
        </Button>
      </form>
    </Paper>
  );
};
