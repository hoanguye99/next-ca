import staffApi from '@/api/staff-api'
import { useAppSelector } from '@/app/hooks'
import { selectUserDetail } from '@/features/auth/user-slice'
import { useGetUserWithState } from '@/hooks/query'
import {
  GetTicketDetailResponse,
  TransferTicketRequestBody,
  TransferTicketResponse
} from '@/models/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

export interface TransferTicket {
  note: string
  new_assignee: string
  time_spent: number
}

export const useTransferTicket = (
  getTicketDetailData: GetTicketDetailResponse
) => {
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TransferTicket>({defaultValues: {time_spent: Number(getTicketDetailData.time_spent.replace(/h/g, ''))}})

  const {
    status: status3,
    fetchStatus: fetchUserStatus,
    data: getUserData,
    error: error3,
    setUser,
  } = useGetUserWithState()
  if (status3 === 'error') console.log(error3)

  // const {
  //   status: status2,
  //   fetchStatus: fetchUserStatus,
  //   data: getUserData,
  //   error: error2,
  //   setUser,
  // } = useGetUserWithState()
  // if (status2 === 'error') console.log(error2)

  const userDetail = useAppSelector(selectUserDetail)
  const queryClient = useQueryClient()
  const [showErrorModal, setShowErrorModal] = useState(false)

  const mutation = useMutation<TransferTicketResponse,AxiosError,TransferTicketRequestBody,TransferTicketResponse>(
    (transferTicketBody) =>
      staffApi.transferTicket(
        userDetail,
        getTicketDetailData.issue_id,
        transferTicketBody
      ),
    {
      onError: (error, variables, context) => {
        setShowErrorModal(true)
      },
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries([
          'getTicketDetail',
          getTicketDetailData.id.toString(),
        ])
      },
    }
  )

  function closeErrorModal() {
    mutation.reset()
    setShowErrorModal(false)
  }

  const handleFormSubmit: SubmitHandler<TransferTicket> = async (data) => {
    const transferTicketBody = {
      ticket_id: Number(getTicketDetailData.id),
      note: data.note,
      new_assignee: getUserData!.key,
      time_spent: `${data.time_spent}h`,
    }
    mutation.mutate(transferTicketBody)
  }

  return {
    // Form
    register,
    setValue,
    getValues,
    handleSubmit,
    errors,
    handleFormSubmit,
    reset,

    // Get User query
    fetchUserStatus,
    getUserData,
    setUser,

    // Post Create variables
    mutation,
    showErrorModal,
    closeErrorModal,
    createError: mutation.error,
  }
}
