import staffApi from '@/api/staff-api'
import { useAppSelector } from '@/app/hooks'
import { selectUserDetail } from '@/features/auth/user-slice'
import { useGetUserWithState } from '@/hooks/query/shared'
import { ticketDetailKeys } from '@/hooks/query/ticket-detail'
import {
  GetTicketDetailResponse,
  TransferTicketRequestBody,
  TransferTicketResponse,
  TransitionStatusRequestBody,
  TransitionStatusResponse
} from '@/models/api'
import {
  UseBaseMutationResult,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export interface TransferTicket {
  note: string
  new_assignee: string
  time_spent: number
}

export const useTransferTicket = (
  closeDetailModal: () => void,
  getTicketDetailData: GetTicketDetailResponse,
  mutation: UseBaseMutationResult<
    TransferTicketResponse,
    AxiosError<unknown, any>,
    TransferTicketRequestBody,
    TransferTicketResponse
  >
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
    fetchStatus: fetchUserStatus,
    data: getUserData,
    setUser,
  } = useGetUserWithState()

  const handleFormSubmit: SubmitHandler<TransferTicket> = async (data) => {
    closeDetailModal()
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
  }
}

export const useTransferTicketMutation = (
  getTicketDetailData: GetTicketDetailResponse
) => {
  const userDetail = useAppSelector(selectUserDetail)
  const queryClient = useQueryClient()

  return useMutation<
    TransferTicketResponse,
    AxiosError,
    TransferTicketRequestBody,
    TransferTicketResponse
  >(
    (transferTicketBody) =>
      // staffApi.transferTicket(
      //   userDetail,
      //   getTicketDetailData.issue_id,
      //   transferTicketBody
      // ),
      toast.promise(
        staffApi.transferTicket(
          userDetail,
          getTicketDetailData.issue_id,
          transferTicketBody
        ),
        {
          loading: 'Transfering',
          success: 'Transfer Success',
          error: (err) => (err as AxiosError).message,
        },
        {
          style: {
            minWidth: '200px',
          },
        }
      ),

    {
      onError: (error, variables, context) => {},
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries(
          ticketDetailKeys.getTicketDetail(getTicketDetailData.issue_key)
        )
      },
    }
  )
}

export const useChangeStatus = (
  getTicketDetailData: GetTicketDetailResponse
) => {
  const userDetail = useAppSelector(selectUserDetail)
  const queryClient = useQueryClient()
  return useMutation<
    TransitionStatusResponse,
    AxiosError,
    TransitionStatusRequestBody,
    TransitionStatusResponse
  >(
    (transitionStatusBody) =>
      staffApi.transitionStatus(
        userDetail,
        getTicketDetailData.issue_id,
        transitionStatusBody
      ),
    {
      onError: (error, variables, context) => {
        toast.error(error.message, { position: 'top-center' })
      },
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries(
          ticketDetailKeys.getTicketDetail(getTicketDetailData.issue_key)
        )
        queryClient.invalidateQueries(
          ticketDetailKeys.getChangeStatus(getTicketDetailData.issue_id)
        )
        // toast.success("Status Updated Successfully", {position: 'top-center'})
      },
    }
  )
}
