import loginApi from '@/api/login-api'
import { LoginResponse } from '@/models/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'

export type LoginFormData = {
  username: string
  password: string
}

export const useLoginForm = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>()

  const mutation = useMutation<LoginResponse, AxiosError, LoginFormData>(
    (formData) => loginApi.login(formData),
    {
      // onError: (err, variables, context) => {
      //   console.log(err)
      // },
      onSuccess: (data, variables, context) => {
        queryClient.clear()
        if (typeof window !== 'undefined') {
          localStorage.setItem('nextca-userInfo', JSON.stringify(data))
        }
        router.push('/homepage')
      },
    }
  )

  const handleFormSubmit: SubmitHandler<LoginFormData> = async (data) => {
    mutation.mutate(data)
  }


  return {
    register,
    handleSubmit,
    errors,
    handleFormSubmit,

    mutation,
  }
}
