import { Button, Input, Label } from '@/components/styled'
import { LoginError } from '@/models/api'
import { LoginFormData, useLoginForm } from './hooks'

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    errors,
    handleFormSubmit,

    mutation,
  } = useLoginForm()

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
      {mutation.isError && (
        <p className="mt-3 -mb-3 italic text-red-500 text-sm">
          {(mutation.error.response?.data as LoginError).description}
        </p>
      )}
      <div className="mt-6">
        <Button posting={mutation.isLoading} className="w-full">
          Đăng nhập
        </Button>
      </div>
    </form>
  )
}

export default LoginForm
