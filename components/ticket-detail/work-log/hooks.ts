import staffApi from '@/api/staff-api'
import { useAppSelector } from '@/app/hooks'
import { selectUserDetail } from '@/features/auth/user-slice'
import {
  ticketDetailKeys,
  useGetConfigWorkLog
} from '@/hooks/query/ticket-detail'
import {
  CreateWorkLogRequestBody,
  CreateWorkLogResponseBody,
  GetTicketDetailResponse
} from '@/models/api'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export interface WorkLogCreate {
  startDate: string
  timeSpent: string
  typeOfWork: string
  phaseWorklog: string
  comment: string
  ot: number
}

export const useWorkLogCreate = (
  closeDetailModal: () => void,
  getTicketDetailData: GetTicketDetailResponse,
  mutation: UseMutationResult<CreateWorkLogResponseBody, AxiosError<unknown, any>, CreateWorkLogRequestBody, CreateWorkLogResponseBody>
) => {
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WorkLogCreate>()

  const { data: getConfigWorkLogData } = useGetConfigWorkLog()

  const handleFormSubmit: SubmitHandler<WorkLogCreate> = async (data) => {
    closeDetailModal()
    const createWorkLog = {
      startDate: data.startDate,
      timeSpent: data.timeSpent,
      typeOfWork: data.typeOfWork,
      phaseWorklog: getConfigWorkLogData!.phaseOfWorkLogs
        .find((obj) => obj.name === data.phaseWorklog)!
        .id.toString(),
      comment: data.comment,
      ot: data.ot ? 1 : 0,
      ticket_id: getTicketDetailData.id,
    }
    mutation.mutate(createWorkLog)
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

    getConfigWorkLogData,
  }
}

export const useWorkLogCreateMutation = (
  getTicketDetailData: GetTicketDetailResponse
) => {
  const userDetail = useAppSelector(selectUserDetail)
  const queryClient = useQueryClient()
  return useMutation<
    CreateWorkLogResponseBody,
    AxiosError,
    CreateWorkLogRequestBody,
    CreateWorkLogResponseBody
  >(
    (createWorkLogBody) =>
      // staffApi.createWorkLog(
      //   userDetail,
      //   getTicketDetailData.issue_key,
      //   createWorkLogBody
      // ),
      toast.promise(
        staffApi.createWorkLog(
          userDetail,
          getTicketDetailData.issue_key,
          createWorkLogBody
        ),
        {
          loading: 'Submitting ...',
          success: 'New WorkLog Added',
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
