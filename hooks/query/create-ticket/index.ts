import staffApi from '@/api/staff-api'
import { useAppSelector } from '@/app/hooks'
import { selectUserDetail } from '@/features/auth/user-slice'
import { useQuery } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useState } from 'react'

export function useGetConfigTicket() {
  const userDetail = useAppSelector(selectUserDetail)
  return useQuery(['create-ticket', 'getConfigTicket'], () =>
    staffApi.getConfigTicket(userDetail)
  )
}

export function useGetComponent(watchProject: string, project_id: number) {
  // console.log("watchProject", watchProject)
  const userDetail = useAppSelector(selectUserDetail)
  return useQuery(
    ['create-ticket', 'getComponent', project_id],
    () => staffApi.getComponent(userDetail, project_id),
    {
      // The query will not execute until enabled
      enabled: !!watchProject,
    }
  )
}

export function useCreateMutation<TREQ, TRES>(
  cb: (param: TREQ) => Promise<TRES>
) {
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)

  const mutation = useMutation<TRES, AxiosError, TREQ, TRES>(cb, {
    onError: (error, variables, context) => {
      setShowErrorModal(true)
    },
    onSuccess: (data, variables, context) => {
      setShowDetailModal(true)
    },
  })

  function closeDetailModal() {
    mutation.reset()
    setShowDetailModal(false)
  }

  function closeErrorModal() {
    mutation.reset()
    setShowErrorModal(false)
  }

  return {
    showDetailModal,
    closeDetailModal,
    data: mutation.data,
    posting: mutation.isLoading,
    showErrorModal,
    closeErrorModal,
    error: mutation.error,
    mutation,
  }
}
