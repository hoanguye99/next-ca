import { MainLayout } from '@/components/layout'
import Head from 'next/head'
import React from 'react'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { Button } from '@/components/styled'
import { LoginResponse } from '@/models/api'

interface LoginSubmit {
  username: string
  password: string
}

const HomePage = () => {
  const mutation = useMutation<LoginResponse,AxiosError,LoginSubmit,LoginResponse>((data) => axios.post('http://180.93.175.236:3000/staff/login', data))

  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>

      {mutation.isError && (
        <div>An error occurred: {mutation.error.message}</div>
      )}

      {mutation.isSuccess && <p>{mutation.data.toString()}</p>}

      <Button
        onClick={() => mutation.mutate({ username: 'dungnh', password: '2' })}
        posting={mutation.isLoading}
      >
        Submit
      </Button>

      <div>HomefPffage</div>
    </>
  )
}

HomePage.Layout = MainLayout

export default HomePage
