import staffApi from '@/api/staff-api'
import { useAppSelector } from '@/app/hooks'
import { selectUserDetail } from '@/features/auth/user-slice'
import { ticketDetailKeys } from '@/hooks/query/ticket-detail'
import {
  CreateLogCommentBody,
  CreateLogCommentResponse,
  GetTicketDetailResponse,
} from '@/models/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import dayjs from 'dayjs'
import { SubmitHandler, useForm, UseFormReset } from 'react-hook-form'
import toast from 'react-hot-toast'

export interface LogCommentCreate {
  content: string
}

export const useLogCommentCreate = (
  getTicketDetailData: GetTicketDetailResponse
) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LogCommentCreate>()

  const mutation = useLogCommentCreateMutation(getTicketDetailData, reset)

  const handleFormSubmit: SubmitHandler<LogCommentCreate> = async (data) => {
    const createLogCommentBody = {
      ticket_id: getTicketDetailData.id,
      content: data.content,
    }
    mutation.mutate(createLogCommentBody)
  }

  return {
    // Form
    register,
    handleSubmit,
    errors,
    handleFormSubmit,

    mutation,
  }
}

export const useLogCommentCreateMutation = (
  getTicketDetailData: GetTicketDetailResponse,
  reset: UseFormReset<LogCommentCreate>
) => {
  const userDetail = useAppSelector(selectUserDetail)
  const queryClient = useQueryClient()
  return useMutation<
    CreateLogCommentResponse,
    AxiosError,
    CreateLogCommentBody,
    { previousTicketDetail: GetTicketDetailResponse }
  >(
    (createLogCommentBody) =>
      staffApi.createLogComment(
        userDetail,
        getTicketDetailData.issue_key,
        createLogCommentBody
      ),
    {
      onMutate: async (createLogCommentBody) => {
        reset()
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(
          ticketDetailKeys.getTicketDetail(getTicketDetailData.issue_key)
        )

        // Snapshot the previous value
        const previousTicketDetail = queryClient.getQueryData(
          ticketDetailKeys.getTicketDetail(getTicketDetailData.issue_key)
        ) as GetTicketDetailResponse

        // Optimistically update to the new value
        queryClient.setQueryData(
          ticketDetailKeys.getTicketDetail(getTicketDetailData.issue_key),
          {
            ...getTicketDetailData,
            detailComment: [
              {
                id: getTicketDetailData.detailComment[0]?.id + 1 || 1,
                content: createLogCommentBody.content,
                date_created: dayjs(),
                created_by_account: userDetail.key,
                ticket_id: createLogCommentBody.ticket_id,
              },
              ...getTicketDetailData.detailComment,
            ],
          }
        )

        // Return a context object with the snapshotted value
        return { previousTicketDetail }
      },
      onError: (error, variables, context) => {
        toast.error(error.message)
        queryClient.setQueryData(
          ticketDetailKeys.getTicketDetail(getTicketDetailData.issue_key),
          context!.previousTicketDetail
        )
      },
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries(
          ticketDetailKeys.getTicketDetail(getTicketDetailData.issue_key)
        )
      },
    }
  )
}
