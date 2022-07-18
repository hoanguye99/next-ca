import axiosClient from '@/api/axios-client'
import type { NextPage } from 'next'
import { useEffect } from 'react'
import useSWR from 'swr'

const Home: NextPage = () => {
  
  const config = {
    headers: {
      token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QyIiwidHlwZSI6IkFDQ0VTU19UT0tFTiIsImZ1bGxfbmFtZSI6IkJyaWdpdCBGcmFuemV3aXRjaCIsImVtYWlsIjoiYmZyYW56ZXdpdGNoMUB0b3BsaXN0LmN6IiwicGhvbmUiOiI5NzYxNDA3MjI2Iiwicm9sZSI6IlNUQUZGIiwiaWF0IjoxNjU4MTQwMDAzLCJleHAiOjE2NTgxNDM2MDN9.TUGVqm3T_3G7WqeBEapEdbOmScVNIvQKxp1lH38mQxGjhzxcXrju0jjCxIff1ngwH5XbPIKgLPTA6mLGibbKo9qCOIYjWYWnpDnxVv4fubGsakE9kOj4wmQoUlkTK2VHlY0GxuClWG56wdU43EBZs0zj4ohvEnvBhdyvrbYy3Kw',
    }
  }

  const { data, error, isValidating, mutate } = useSWR('/staff/ticketStatusAllByStaff', url => axiosClient.get('/staff/ticketStatusAllByStaff', config)) //eslint-disable-line
  
  
  useEffect(() => {
    console.log(data);
    console.log(error);

  }, [data, error])


  return (
    <>
    <div className="bg-teal-700 p-3">
      Follow me come and get illusion
    </div>
    </>
  )
}

export default Home
