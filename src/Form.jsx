
import _ from './Form.module.css';
import { useForm } from 'react-hook-form';

export const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    console.log('data: ', data);
  }

  return (
    <form className={_.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={_.wrap}>
        <label className={_.label} htmlFor='email'>Email</label>
        <input
          className={_.input}
          autoComplete="username"
          type='text'
          id='email'
          aria-invalid= {!!errors.email}
          {...register('email', {
            required: {
              value: true,
              message: 'Поле обязательно для заполнения'
            },
            pattern: {
              value: /^.+@.+\..+$/,
              message: 'Неверный email'
            }
          })}
        />
        {
          errors.email &&
            <p className={_.error}>{errors.email.message}</p>
        }
      </div>

      <div className={_.wrap}>
        <label className={_.label} htmlFor='password'>Пароль</label>
        <input
          className={_.input}
          autoComplete="current-password"
          type='password'
          id='password' 
          aria-invalid= {!!errors.password}
          {...register('password', {
            required: {
              value: true,
              message: 'Поле обязательно для заполнения'
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/,
              message: '6 символов, спецсимвол, цифра, строчные и прописные буквы'
            }
          })}
        />

        {
          errors.password &&
            <p className={
              errors.password.message === '6 символов, спецсимвол, цифра, строчные и прописные буквы' ?
                `${_.error} ${_['error--password']}` :
                _.error
            }>{errors.password.message}</p>
        }
      </div>

      <div className={_.wrapCheckbox}>
        <input
          className={_.checkbox}
          type='checkbox'
          id='savePassword'
          {...register('savePassword')}
        />
        <label
          className={_.labelCheckbox}
          htmlFor='savePassword'
        >
        Запомнить пароль
        </label>
      </div>

      <button className={_.submit} type='submit'>Войти</button>

      <p className={_.errorSubmit}>Сообщение об ошибке</p>
    </form>
  )
}
