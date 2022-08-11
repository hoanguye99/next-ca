import staffApi from '@/api/staff-api'
import { useAppSelector } from '@/app/hooks'
import { selectUserDetail } from '@/features/auth/user-slice'
import { ticketDetailKeys, useGetConfigWorkLog } from '@/hooks/query/ticket-detail'
import { CreateWorkLogRequestBody, CreateWorkLogResponseBody, GetTicketDetailResponse } from '@/models/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

export interface WorkLogCreate {
  startDate: string
  timeSpent: string
  typeOfWork: string
  phaseWorklog: string
  comment: string
  ot: number
}

export const useWorkLogCreate = (getTicketDetailData: GetTicketDetailResponse) => {
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WorkLogCreate>()

  const {
    status: status1,
    data: getConfigWorkLogData,
    error: error1,
  } = useGetConfigWorkLog()
  if (status1 === 'error') console.log(error1)

  const userDetail = useAppSelector(selectUserDetail)
  const queryClient = useQueryClient()
  const [showErrorModal, setShowErrorModal] = useState(false)

  const mutation = useMutation<CreateWorkLogResponseBody, AxiosError, CreateWorkLogRequestBody, CreateWorkLogResponseBody>(createWorkLogBody => staffApi.createWorkLog(userDetail, getTicketDetailData.issue_key, createWorkLogBody), {
    onError: (error, variables, context) => {
      setShowErrorModal(true)
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(ticketDetailKeys.getTicketDetail(getTicketDetailData.issue_key))
    },
  })

  function closeErrorModal() {
    mutation.reset()
    setShowErrorModal(false)
  }

  const handleFormSubmit: SubmitHandler<WorkLogCreate> = async (data) => {
    const createWorkLog = {
      startDate: data.startDate,
      timeSpent: data.timeSpent,
      typeOfWork: data.typeOfWork,
      phaseWorklog: getConfigWorkLogData!.phaseOfWorkLogs.find(obj => obj.name=== data.phaseWorklog)!.id.toString(),
      comment: data.comment,
      ot: data.ot ? 1 : 0,
      ticket_id: getTicketDetailData.id
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

    // Post Create variables
    mutation,
    showErrorModal,
    closeErrorModal,
    createError : mutation.error,
  }
}
