import staffApi from '@/api/staff-api'
import { useAppSelector } from '@/app/hooks'
import { selectUserDetail } from '@/features/auth/user-slice'
import { useGetUserWithState } from '@/hooks/query/shared'
import {
  GetTicketDetailResponse,
  TransferTicketRequestBody,
  TransferTicketResponse,
  TransitionStatusRequestBody,
  TransitionStatusResponse,
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
  } = useForm<TransferTicket>({
    defaultValues: {
      time_spent: Number(getTicketDetailData.time_spent.replace(/h/g, '')),
    },
  })

  const {
    status: status3,
    fetchStatus: fetchUserStatus,
    data: getUserData,
    error: error3,
    setUser,
  } = useGetUserWithState()
  if (status3 === 'error') console.log(error3)

  const userDetail = useAppSelector(selectUserDetail)
  const queryClient = useQueryClient()
  const [showErrorModal, setShowErrorModal] = useState(false)

  const mutation = useMutation<
    TransferTicketResponse,
    AxiosError,
    TransferTicketRequestBody,
    TransferTicketResponse
  >(
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
          getTicketDetailData.issue_key,
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

export const useChangeStatus = (
  getTicketDetailData: GetTicketDetailResponse
) => {
  const userDetail = useAppSelector(selectUserDetail)
  const queryClient = useQueryClient()
  const mutation = useMutation<TransitionStatusResponse,AxiosError,TransitionStatusRequestBody,TransitionStatusResponse>(
          (transitionStatusBody) =>
            staffApi.transitionStatus(
              userDetail,
              getTicketDetailData.issue_id,
              transitionStatusBody
            ),
          {
            onError: (error, variables, context) => {
              // setShowErrorModal(true)
            },
            onSuccess: (data, variables, context) => {
              queryClient.invalidateQueries([
                'getTicketDetail',
                getTicketDetailData.issue_key,
              ])
              queryClient.invalidateQueries([
                'getChangeStatus',
                getTicketDetailData.issue_id,
              ])
            },
          }
        )


  return {
    mutation
  }
}
