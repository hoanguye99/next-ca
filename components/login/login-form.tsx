import loginApi from 'api/login-api'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { Button, Input, Label } from '@/components/styled'
import {
  loginAsync,
  selectFailureDescription,
  selectStatus,
} from 'features/auth/user-slice'
import { useForm, SubmitHandler } from 'react-hook-form'
import React from 'react'

export type LoginFormData = {
  username: string
  password: string
}

const LoginForm = () => {
  const failureDescription = useAppSelector(selectFailureDescription)
  const status = useAppSelector(selectStatus)
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>()
  const handleFormSubmit: SubmitHandler<LoginFormData> = async (data) => {
    // loginApi
    //   .add({ username: 'hoangnd25@fpt.com.vn', password: 'ArianaGrande2' })
    //   .then((res) => {
    //     dispatch(logIn({ username: 'hoang', password: 'hoang123' }))
    //   })
    //   .catch((err) => console.log(err))
    await dispatch(loginAsync(data))
  }
  /* eslint-disable */
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <Label>Account Mail FPT</Label>
        <Input<LoginFormData>
          type="text"
          name="email"
          id="email"
          placeholder="example@fpt.com.vn"
          register={register}
          label="username"
          required={true}
        />
      </div>

      <div className="mt-6">
        <Label>Mật khẩu</Label>

        <Input<LoginFormData>
          type="password"
          name="password"
          id="password"
          placeholder="Mật khẩu"
          register={register}
          label="password"
          required={true}
        />
      </div>
      {failureDescription && failureDescription != '' && (
        <p className="mt-3 -mb-3 italic text-red-500 text-sm">
          {failureDescription}
        </p>
      )}
      <div className="mt-6">
        <Button posting={status === 'loading'} className="w-full">
          Đăng nhập
        </Button>
      </div>
    </form>
  )
}

export default LoginForm
